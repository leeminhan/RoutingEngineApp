import React, { Component } from "react";
import rainbowSDK from "rainbow-web-sdk";
// import config from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { ThemeProvider } from '@livechat/ui-kit';

//------------------------------------------------Components----------------------------------------------------
import Navbar from '../components/Navbar';
import PrefForm from '../components/PrefForm';
import CPFBoard from "../components/CPFBoard";
import Aboutus from '../components/Aboutus';
import Agents from '../components/Agents';
import FAQ from '../components/FAQ';
import { Launcher } from "react-chat-window";
import { Alert, AlertTitle } from '@material-ui/lab';
import { useAlert } from 'react-alert'
import initialize from "../initialize"; 
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messageList: [],
      firstName: null,
      lastName: null,
      language: null,
      chatMode: null,
      top: null,
      loginEmail: "",
      loginPassword: "",
      status: "",
      agentObject: null,
      conversationObject: null
    }
    initialize();
  }

//------------------------------------------------Form event handlers-----------------------------------------------
  onFirstNameChangeHandler = (event) => {
    this.setState({firstName: event.target.value});
  }

  onLastNameChangeHandler = (event) => {
    this.setState({lastName: event.target.value});
  }

  onChatModeChangeHandler = (event) => {
    this.setState({chatMode: parseInt(event.target.value,10)});
  }

  onLanguageChangeHandler = (event) => {
    this.setState({language: parseInt(event.target.value,10)});
  }

  onProblemChangeHandler = (event) => {
    this.setState({top: parseInt(event.target.value,10)});
  }
  
  uploadDatabaseHandler = async() =>{
    await axios.post("http://localhost:8000/users", this.state).then(() => {
      console.log("Client: Uploaded user information to Database")
    }).catch(error => {
      console.log(error)
    })
  }

  // Check whether all fields have been completed by user
  checkValidInputs = () => {
    const inputs = [this.state.firstName, this.state.lastName, this.state.chatMode ,this.state.language, this.state.top];
    if (inputs.includes(null)){
      return false;
    } else {
      return true ;
    }
  }

  submitHandler = async() => {
    if (this.checkValidInputs()) {
      try{
        this.uploadDatabaseHandler()
        const loginCredentials  = await this.createGuestAccHandler() //must have await as this handler is a promise itself; otherwise will show promise<pending>
        await this.signInHandler(loginCredentials.data.loginEmail, loginCredentials.data.password)
        // await this.searchByIdHandler(agentStrId)
        await this.openConversationHandler()
      }catch(error){
        console.log(error)
      } 
    } else {
      console.log("form not fully filled")
      // const alert = useAlert()
      // alert.show('Oh look, an alert!')
      // return(
      //     <Alert severity="warning" onClose={() => {}}>Please ensure no fields are left blank</Alert>
      // ); 
    }
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
    console.log(message)
    console.log(message.data)
    console.log(this.state.messageList)
    // this.openConversationHandler(message.data.text)
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
            onLanguageChange = {this.onLanguageChangeHandler.bind(this)}
            onProblemChange = {this.onProblemChangeHandler.bind(this)}
            onSubmit = {this.submitHandler.bind(this)}
          />
          
          {/* <Aboutus/>
          <Agents/>
          <FAQ/> */}
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
              showEmoji
          />

      </div>
    );
  }
}

export default App;