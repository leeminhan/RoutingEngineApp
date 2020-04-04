import React, { Component } from "react";
import rainbowSDK from "rainbow-web-sdk";
// import config from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { ThemeProvider } from '@livechat/ui-kit';

//------------------------------------------------Components----------------------------------------------------
import { Grid, TextField } from '@material-ui/core';
import {Button} from "react-bootstrap";
import Navigation from '../components/Navigation';
import Chatradiobutton from '../components/Chatradiobutton';
import Languageradiobutton from '../components/Languageradiobutton';
import Enquiryradiobutton from '../components/Enquiryradiobutton';
import { Launcher } from "react-chat-window";
import initialize from "../initialize"; 
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messageList: [],
      firstName: "",
      lastName: "",
      language: "en-us", //change the lanuageradiobutton setting of 0/1/2/3
      chatMode: 0,
      top: 0,
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

  submitHandler = async() => {
    
    try{
      this.uploadDatabaseHandler()
      const loginCredentials  = await this.createGuestAccHandler() //must have await as this handler is a promise itself; otherwise will show promise<pending>
      // var loginCredentials = this.createGuestAccHandler()
      console.log(loginCredentials)
      // console.log(this.state.loginEmail)
      // await this.signInHandler(loginCredentials.data.loginEmail, loginCredentials.data.password)
    }catch(error){
      console.log(error)
    }
    
    // await this.openConversationHandler()
    // await this.sendMessageHandler()
  }

  /* Create Guest Account and SignIn to Guest Account at the same time -------------------------*/
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
    rainbowSDK.connection.signin(loginEmail, loginPassword).then(account => {
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

  // openConversationHandler = async() => {

  //   const agentStrId = "5e5fdf3bd8084c29e64eb20a" //"5e84513235c8367f99b94cee"
  //   const agentObject = await this.searchByIdHandler(agentStrId)

  //   rainbowSDK.conversations.openConversationForContact(agentObject).then((conversation) => {
  //     console.log(`Client: Successful openConversation: ${conversation}`)
  //     const strMessage = 'Hi There'
  //     // this.sendMessageHandler(conversation, strMessage)
  //     this.setState({conversationObject: conversation})
  //     rainbowSDK.im.sendMessageToConversation(conversation, strMessage)
  //     console.log('Client: Send message success')
  //   }).catch(error => {
  //     console.log('Client: Failed to openConversation')
  //   })
  // }

  openConversationHandler = async() => {

    const agentStrId = "5e5fdf3bd8084c29e64eb20a" //"5e84513235c8367f99b94cee"
    const agentObject = await this.searchByIdHandler(agentStrId)

    rainbowSDK.conversations.openConversationForContact(agentObject).then((conversation) => {
      console.log(`Client: Successful openConversation: ${conversation}`)
      this.setState({conversationObject: conversation})
      this.sendMessageHandler(conversation)
      return conversation
    }).catch(error => {
      console.log('Client: Failed to openConversation')
    })
  }
  // Expects conversationObject and strMessage
  sendMessageHandler = async(conversationObject) => {
    // const conversationObject = await this.openConversationHandler()
    const strMessage = 'Hi There'
    console.log(strMessage)
    try{
      rainbowSDK.im.sendMessageToConversation(conversationObject, strMessage)
      console.log('Client: Send message success')
    }catch(error){
      console.log('Client: Failed to send message')
      console.log(error)
    }
    
    // console.log("Client:", result)
   
  }
  
  // getMessageHandler = () => {

  // }
  

//------------------------------------------------Launcher event handlers-----------------------------------------------

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
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
      });
      this.sendMessageHandler(this.state.conversationObject, 'HELLLLLO');
    }
  }

  render() {
    return (
      <div className='main'>
        <div className='Navbar'>
          <Navigation />
        </div>

        <div className='img'>
        </div>

        <div className='prefForm'>

          <div className = "titleSection">
            <h2 className = "formTitle">Have questions regarding your CPF? Connect with our friendly agents! </h2>                                                                                                                                                                                                                                                                                                                                                                                                                
          </div>

          <div className = "formSection">  
            <h3 className = "formTitle">Enter your name </h3>
            <form noValidate autoComplete="off" class = "nameInput">
                <TextField  name = "FirstName" onChange = {this.onFirstNameChangeHandler.bind(this)} label="First Name" />
                <span style={{display: 'inline-block', width: '10px'}} />
                <TextField  name = "LastName"  onChange = {this.onLastNameChangeHandler.bind(this)} label="Last Name"  />
            </form>
          </div>

          <div className = "formSection">
            <h3 className = "formTitle">Select chat mode</h3>
            <Chatradiobutton value = {this.state.chatMode} onChange = {this.onChatModeChangeHandler.bind(this)} />
          </div>

          <div className = "formSection">
            <h3 className = "formTitle"> Select language </h3>
            <Languageradiobutton value = {this.state.language} onChange = {this.onLanguageChangeHandler.bind(this)} />
          </div>

          <div className = "formSection">
            <h3 className = "formTitle">  Select category of enquiry </h3>
            <Enquiryradiobutton value = {this.state.problem} onChange = {this.onProblemChangeHandler.bind(this)}/>
          </div>
          
          <div className = "submitButton">
            <br></br>
            <Button className="custom-btn" onClick = {this.submitHandler.bind(this)}>
              Submit
            </Button>
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
      </div>
    );
  }
}

export default App;


  //  openConversationHandler = () => {

  //   const agentStrId = "5e5fdf3bd8084c29e64eb20a" //"5e84513235c8367f99b94cee"

  //   this.searchByIdHandler(agentStrId).then((agentObject) => {
  //     //openConversation with that agent based on agentObject which can be retrieved from finding the agent
  //     rainbowSDK.conversations.openConversationForContact(agentObject).then((conversation) => {
  //       console.log(`Client: Successful openConversation: ${conversation}`)
  //       const strMessage = 'Hi There'
  //       // this.sendMessageHandler(conversation, strMessage)
  //       this.setState({conversationObject: conversation})
  //       rainbowSDK.im.sendMessageToConversation(conversation, strMessage)
  //       console.log('send message success')
  //     }).catch(error => {
  //       console.log('Client: Failed to openConversation')
  //     })

  //   }).catch(error => {
  //     console.log('Client: Failed to find Agent id')
  //     console.log(error)
  //   })
  // }