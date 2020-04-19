import React, { Component } from "react";
import rainbowSDK from "rainbow-web-sdk";
// import config from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { ThemeProvider } from '@livechat/ui-kit';
import initialize from "../initialize"; 
import "./App.css";

//------------------------------------------------Components----------------------------------------------------
import Navbar from '../components/Navbar';
import PrefForm from '../components/PrefForm';
import CPFBoard from "../components/CPFBoard";
import { Launcher } from "react-chat-window";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configure toast component for usage
toast.configure({
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messageList: [],
      loginEmail: "",
      loginPassword: "",
      status: "",
      agentObject: null,
      conversationObject: null,
      submitTime: 0,
      numMessage: 0,
      openWindowTime: 0,
      loadingState: null,
      isOpen: false,
      userInfo: {
        firstName: null,
        lastName: null,
        language: null, 
        chatMode: null,
        top: null,
        queueNumber: 0,
      }
    }
    initialize();
  }

//------------------------------------------------Form event handlers-----------------------------------------------
  onFirstNameChangeHandler = (event) => {
    const {value} = event.target;
    this.setState(prevState => ({
      userInfo: {                   
          ...prevState.userInfo,    
          firstName: value       
      }
    }));
  }

  onLastNameChangeHandler = (event) => {
    const {value} = event.target;
    this.setState(prevState => ({
      userInfo: {                   
          ...prevState.userInfo,    
          lastName: value       
      }
    }));
  }

  onChatModeChangeHandler = (event) => {
    const {value} = event.target;
    this.setState(prevState => ({
      userInfo: {                   
          ...prevState.userInfo,    
          chatMode: parseInt(value,10)       
      }
    }));
  }

  onLanguageChangeHandler = (event) => {
    const {value} = event.target;
    this.setState(prevState => ({
      userInfo: {                   
          ...prevState.userInfo,    
          language: parseInt(value,10)       
      }
    }));
  }

  onProblemChangeHandler = (event) => {
    const {value} = event.target;
    this.setState(prevState => ({
      userInfo: {                   
          ...prevState.userInfo,    
          top: parseInt(value,10)       
      }
    }));
  }

  // Checks whether user is spamming
  checkForSpam = (message) => {
    const newMessagesCount = this.state.numMessage + 1;
    this.setState({numMessage: newMessagesCount})
    const now = new Date();
    const timeElapsed = (now.getTime() - this.state.openWindowTime)/1000;

    if ((newMessagesCount/timeElapsed) > 1  && newMessagesCount > 10) {
      toast.error('Pls do not spam',{
        toastId: 'spamMsg',
        className: 'spamMsg',
      });
      this._handleClick();
    }
    
  }
  
  // Check whether all fields have been completed by user
  checkValidInputs = () => {
    const inputs = [this.state.userInfo['firstName'],this.state.userInfo['lastName'],this.state.userInfo['chatMode'],this.state.userInfo['language'],this.state.userInfo['top']];
    console.log(inputs)
    if (inputs.includes(null)){
      toast.error('You have empty fields',{
        toastId: 'nullInput',
        className: 'nullInput',
      });
      return false;
    } else {
      return true ;
    }
  }

  // Check whether last submit was more than 60s ago
  checkMultipleSubmit = () => {
    const now = new Date();
    const timeDiff = (now.getTime() - this.state.submitTime) / 1000;
    if (timeDiff > 60) {
      return true;
    } else {
      toast.error('No more than 1 submission per minute',{
        toastId: 'multipleSubmit',
        className: 'multipleSubmit',
      });
      return false;
    }
  }

  submitHandler = async() => {
    if (this.checkValidInputs() && this.checkMultipleSubmit()) {
      try{
        console.log("doing api calls")
        const now = new Date();
        this.setState({submitTime:now.getTime()});

        this.uploadDatabaseHandler()
        this.setState({loadingState:'uploadDB' });

        const loginCredentials  = await this.createGuestAccHandler() //must have await as this handler is a promise itself; otherwise will show promise<pending>
        

        await this.signInHandler(loginCredentials.data.loginEmail, loginCredentials.data.password)
        

        // await this.searchByIdHandler(agentStrId)
        
        await this.openConversationHandler()
        
      }catch(error){
        console.log(error)
      } 
    }
  }

  uploadDatabaseHandler = async() =>{
    await axios.post("http://localhost:8000/users", this.state).then(() => {
      console.log("Client: Uploaded user information to Database")
    }).catch(error => {
      console.log(error)
    })
  }

  createGuestAccHandler = async() => {
    //This return means: return a promise that's either resolved/rejected
    return await axios.post("http://localhost:8000/").then((loginCredentials) => {
      console.log('Client: Guest User Account created')
      this.setState({
        loginEmail: loginCredentials.data.loginEmail,
        loginPassword: loginCredentials.data.password
      })
      console.log(loginCredentials)
      return loginCredentials
      // return (loginCredentials) GET BACK TO THIS ---- do something to wait for this to be done before login() occurs
      // this.signInHandler()
    }).catch(error => {
      console.log(error)
    })
  }
  signInHandler = (loginEmail, loginPassword) => {
    // Remember to return promise since we are awaiting the promise to be fulfilled before progressing in above submitHandler
    return rainbowSDK.connection.signin(loginEmail, loginPassword).then(account => {
      // this.openConversationHandler()
      console.log('Client: Signed IN!', account)
    }).catch(error => {
      console.log(error)
    })
  }

  // const contact = agentid from retrieved rbw CLI

  // 1. Search Agent ID -> object
  // 2. openConversationForContact(object)
  // 3. IM service: sendMessage to 

  //Takes in agentId and returns agentObject
  searchByIdHandler = async(agentid) => {
    try {
      const agentObject = await rainbowSDK.contacts.searchById(agentid)
      console.log("Client: Found Agent")
      return agentObject
    }catch(error){
      console.log("Client: Failed to find agent")
      return error
    }
  }

  openConversationHandler = async(message) => {

    //In future, this agentStrID can be hardcoded in the state or best retrieved from the Database
    // and update state with agentObject so that searchByIdHandler won't have to be called to openConversation
    //Refactor searchByIdHandler out of this handler

    const agentStrId = "5e5fdf3bd8084c29e64eb20a" //"5e84513235c8367f99b94cee"
    const agentObject = await this.searchByIdHandler(agentStrId)
    console.log("Agent Object:\n", agentObject)

    return rainbowSDK.conversations.openConversationForContact(agentObject).then((conversation) => {
      console.log("Client: Successful openConversation: \n Conversation Object: \n", conversation)
      this.setState({conversationObject: conversation})
      // this.sendMessageHandler(message)
      return conversation
    }).catch(error => {
      console.log('Client: Failed to openConversation')
    })
  }

  // Expects conversationObject and strMessage
  sendMessageHandler = (message) => {
    try{
      // console.log(this.state.conversationObject)
      // console.log(message)
      rainbowSDK.im.sendMessageToConversation(this.state.conversationObject, message) //should use this.state.conversationObject
      console.log('Client: Send message success')
    }catch(error){
      console.log('Client: Failed to send message')
      console.log(error)
    }
  }

  onNewMessageReceived = (event) =>  {
    let message = event.detail.message;
    let conversation = event.detail.conversation

    console.log(message)
    console.log(message.data)
    const incomingMessage = message.data

    this.setState({
      messageList: [
        ...this.state.messageList,
        {
          author: "them",
          type: "text",
          data: {text: incomingMessage }
        }
      ]
    })
  }

  componentDidMount = () => {
    document.addEventListener(rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED, this.onNewMessageReceived);
  }
  
//------------------------------------------------Launcher event handlers-----------------------------------------------

  _onMessageWasSent = (message) => { //message is the input to the launcher
    this.setState({
      messageList: [...this.state.messageList, message]
    })
    // console.log(message)
    // console.log(message.data)
    // console.log(this.state.messageList)
    // this.openConversationHandler(message.data.text)
    this.checkForSpam(message)
    this.sendMessageHandler(message.data.text)
    
  } 

  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [
          ...this.state.messageList,
          {
            author: "them",
            type: "text",
            data: { text }
          }
        ]
      })
    } 
    

  }
  
  _handleClick() {
    this.setState({isOpen:!this.state.isOpen});
    const now = new Date();
    this.setState({openWindowTime: now.getTime()});
  }

  render() {
    return (
      <div className='main'>

        {/* Background Video  */}
        <video className = "background-video" autoPlay muted loop>
          <source src={require('../Images/Background.mp4')} type="video/mp4" />
                Your browser does not support the video tag.
        </video>

        {/* Background image and title set in css */}
          <div className='home'> 
          </div>

        {/* Website sections */}
        <div className='sections'>
          <CPFBoard/>
          <PrefForm
            onFNameChange = {this.onFirstNameChangeHandler.bind(this)}
            onLNameChange = {this.onLastNameChangeHandler.bind(this)}
            onChatModeChange = {this.onChatModeChangeHandler.bind(this)}
            chatModeValue = {this.state.userInfo['chatMode']}
            onLanguageChange = {this.onLanguageChangeHandler.bind(this)}
            languageValue = {this.state.userInfo['language']}
            onProblemChange = {this.onProblemChangeHandler.bind(this)}
            problemValue = {this.state.userInfo['top']}
            onSubmit = {this.submitHandler.bind(this)}
            loadingState = {this.state.loadingState}
          />
          
          
        </div>

        {/* Navigation bar */}
        <div className = 'NavBar'>
          <Navbar/>
        </div>

        <Launcher
              agentProfile={{
                teamName: `Let's Be Team Players`,
                imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
              }}
              onMessageWasSent={this._onMessageWasSent.bind(this)}
              messageList={this.state.messageList}
              handleClick = {this._handleClick.bind(this)}
              isOpen = {this.state.isOpen}
              showEmoji
          />

      </div>
    );
  }
}

export default App;