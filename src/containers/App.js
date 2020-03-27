import React, { Component } from "react";
import rainbowSDK from "rainbow-web-sdk";
import config from './Config';
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
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messageList: [],
      firstName: "",
      lastName: "",
      language: "en-us",
      chatMode: 0,
      top: 0,
      user: "",
      password: "",
      status: ""
      conversation : NULL
    }
    // this.onLoadedHandler = this.onLoadedHandler.bind(this)
  }

  onLoadedHandler = () => {
    console.log("[DEMO] :: On SDK Loaded !")
    rainbowSDK.initialize(config.applicationID, config.applicationSecret).then((account) => {
      console.log("[DEMO] :: Rainbow SDK is initialized!");
    }).catch(function (err) {
      console.log("[DEMO] :: Something went wrong with the SDK...", err);
    });
  };

//------------------------------------------------Form event handlers-----------------------------------------------
  submitHandler = () => {
    console.log(this.state);
    this.onLoadedHandler();
    this.createGuestAccHandler();
    this.uploadDatabaseHandler();
    this.createChatHandler(); //fill in someones ID
  }

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

//------------------------------------------------Rainbow Chat functions-----------------------------------------------
  
  uploadDatabaseHandler = () =>{
    axios.post("http://localhost:8000/users", this.state).then(() => {
      console.log("Uploaded user information to Database")
    }).catch(error => {
      console.log(error)
    })
  }
  
  createGuestAccHandler = () => {
    const user_info = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      language: this.state.language
    }

    axios.post("/", user_info).then((result) => {
      console.log(result)
      this.setState({user : result.data.guestID});
      this.setState({password : result.data.guestPass});
    }).catch(error => {
      console.log(error)
    })

    rainbowSDK.connection.signin(guestLogin,guestPW).then((guestAccount) =>{
      console.log(guestAccount, "account signed in");
    })catch(error => {
      console.log(error, "failed to sign guest in")
    })
  }

  createChatHandler = (agentID) => {

    rainbowSDK.contacts.searchContactById(agentId).then((contact) => {
      console.log(contact, "agent contact");
      const agentContact = contact;
    }).catch(error => {
      console.log(error, "failed to get agent contact");
    })

    rainbowSDK.conversations.openConversationForContact(agentContact).then((convo) => {
      console.log(convo, "conversation created");
      rainbowSDK.im.sendMessageToConversation(conversation, "Thank you for calling. How may I help you?");
    }).catch(error => {
      console.log(error, "failed to start conversation");
    })
  }

  
  




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

      if (this.state.conversation != NULL) {
        rainbowSDK.Im.sendMessageToConversation(this.state.conversation, text);
      }

    }
  }




  /* Connection Services -> User Sign In
    1. Need a axios.post 
    2. 
  */

  /* When use clicks submit, list of events that need to happen. 

  1. To Create Guest User Account
  createAccHandler(): Sends a axios.post to a route in backend that creates a Guest Acc
  That route will also send back guest credentials to frontend for the user to be signed in

  2. IM Service
  
  3. User information will be uploaded to database
    - To Create a axios.post to a specific route 
  */

  /* Connection Services -> User Sign In
    1. Need a axios.post 
    2. 
  */

  /* IM Service - When User sends a message */


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
