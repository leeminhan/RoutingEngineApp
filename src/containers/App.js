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
import FAQ from "../components/FAQ";
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
      submitTime: 0,  // Stores time where form is submitted. For checking of more than one submit within a minute
      numMessage: 0,  // Checks number of messages sent by user. For checking of spam
      openWindowTime: 0, // Stores the time when the chat window is opened. For checking of Spam
      isOpen: false,  // Checks whether chat window is open
      agentId: null,
      connected: null,
      toPing: false,
      openConvo2Status: null,
      userInfo: {
        firstName: null,
        lastName: null,
        language: null, //change the lanuageradiobutton setting of 0/1/2/3
        chatMode: null,
        top: null,
        queueNumber: 0,
        timestamp: 0, // will be unique for every user hence can be used as an id
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

  //------------------------------------------------Robustness checkers-----------------------------------------------

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

  //------------------------------------------------Form submit handlers-----------------------------------------------

  submitHandler = async() => {
    if (this.checkValidInputs() && this.checkMultipleSubmit()) {
      try{
        const now = new Date();
        this.setState({submitTime:now.getTime()});
        this.uploadDatabaseHandler()
        this.setState({connected:false});
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
    const timestamp = new Date().getTime()
    await this.setState({ userInfo: { ...this.state.userInfo, timestamp: timestamp} });
    console.log(this.state.userInfo.timestamp)
    await axios.post("http://localhost:8000/users", this.state.userInfo).then(() => {
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
      console.log("Client: Login Credentials \n",loginCredentials)
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
      console.log(`Client: Signed IN at ${this.state.userInfo.timestamp}!`, account)
    }).catch(error => {
      console.log(error)
    })
  }

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

  // Executed independent of sendingMessage
  openConversationHandler = async(message) => {
    // and update state with agentObject so that searchByIdHandler won't have to be called to openConversation
    // Refactor searchByIdHandler out of this handler
    // Retrieve Agent Availbility & agentId 
    await axios.post("http://localhost:8000/agents", this.state.userInfo).then(async(res) => {
      const agentId = res.data.agentId
      const availability  = res.data.presence
      
      if (availability === 'online'){
        this.setState({
          agentId: agentId,
          connected: true
        })
        console.log("Client: Agent is available. You will be connected shortly")

        const agentObject = await this.searchByIdHandler(this.state.agentId)
        console.log("Agent Object:\n", agentObject)

        try{
          const conversation = await rainbowSDK.conversations.openConversationForContact(agentObject)
          console.log("Client: Successful openConversation: \n Conversation Object: \n", conversation)
          this.setState({conversationObject: conversation})
          return conversation // exits here if agent openConversation successfully

        }catch(error){
          console.log('Client: Failed to openConversation')
        }
      }  
      else {
        console.log("Client: Agent is unavailable. Please wait")

        this.setState({toPing: true}) // this triggers the if statement in componentDidUpdate
      }
    }).catch(error => {
      console.log(error)
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.toPing != this.state.toPing){
      
      const ping = setInterval( async() =>{
        const toConnectOutcome = await this.openConversationHandler2() // new handler that will that find users earliest timestamp
        console.log("toConnectOutcome:", toConnectOutcome)
        console.log("Client: Still queuing/waiting to be matched. ping.")
        if(toConnectOutcome == 1){
          console.log("I reached line 230")
          console.log('Client: Breaking out of interval')
          clearInterval(ping) //break out
        }
      }, 10000)
    }
  }

  // To handle openConversation for users waiting to be connected by initial rejection
  openConversationHandler2 = async() => {

    await axios.post("http://localhost:8000/agents/reattempt", this.state.userInfo).then(async(res) => {
      
      console.log(res)
      const toConnect = res.data.toConnect

      if (toConnect == true){
        this.setState({
          agentId: res.data.agentId,
          connected: true
        })
        console.log("Client: Agent is available. You will be connected shortly")

        const agentObject = await this.searchByIdHandler(this.state.agentId)
        console.log("Agent Object:\n", agentObject)

        const conversation = await rainbowSDK.conversations.openConversationForContact(agentObject)
        console.log("Client: Successful openConversation: \n Conversation Object: \n", conversation)
        this.setState({conversationObject: conversation})

        console.log("Client: Line 261") 
        this.setState({openConvo2Status: 1})
        // return 1 //Found agent 
      }  
      else {
        console.log("Client: Agent is unavailable. Please wait")
        this.setState({openConvo2Status: 0})
        // return 0
        //implement the queuing and repinging
        // this post req has to be done to a different as the backend will now have to check no just
        // if agent is available but also check for user with shortest timestamp
      }
    }).catch(error => {
      console.log(error)
    })
    console.log(this.state.openConvo2Status)
    return this.state.openConvo2Status
  }
    
  //------------------------------------------------Chatting handlers-----------------------------------------------

  // Expects conversationObject and strMessage
  sendMessageHandler = (message) => {
    try{
      // console.log(this.state.conversationObject)
      // console.log(message)
      rainbowSDK.im.sendMessageToConversation(this.state.conversationObject, message) 
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

  closeConversationHandler = async() => {
    try{
      console.log("Conversation closed")
      console.log("timestamp:",  this.state.userInfo.timestamp )
      const info = {timestamp: this.state.userInfo.timestamp}
      axios.post('http://localhost:8000/users/delete', info).then((res) => {
        console.log("Client: Deleted user successful")
      }).catch(error => {
        console.log('Client: Delete user failed')
        console.log(error)
      })
      await rainbowSDK.conversations.closeConversation(this.state.conversationObject)
    }catch(error){
      console.log("Client: closeConversationHandler failed", error)
    }
  }

  componentDidMount = () => {
    document.addEventListener(rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED, this.onNewMessageReceived);
  }

  _onMessageWasSent = (message) => { //message is the input to the launcher
    this.setState({
      messageList: [...this.state.messageList, message]
    })
    console.log("Client: Message Object", message)
    console.log("Client: Message:", message.data)
    console.log("Client: Message List", this.state.messageList)
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
    if (this.state.isOpen) {
      this.closeConversationHandler();
    }
    this.setState({isOpen:!this.state.isOpen});
    const now = new Date();
    this.setState({openWindowTime: now.getTime()});
  }

  //------------------------------------------------HTML Layout-----------------------------------------------

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
            loadingState = {this.state.connected}
          />
          <FAQ/>
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