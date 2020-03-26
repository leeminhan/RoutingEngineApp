import React, { Component } from "react";
<<<<<<< HEAD
import { Launcher } from "react-chat-window";
import Navigation from "../components/Navigation";
import rainbowSDK from "rainbow-web-sdk";
import config from './Config';
import axios from "axios";
import Button from "../components/Button";

// import "./App.css";

class App extends Component {
  state = {
    messageList: [],
    firstName: "",
    lastName: "",
    language: "",
    problem: "",
    user: "",
    password: "",
    status: ""
  };

  onLoadedHandler = () => {
    console.log("[DEMO] :: On SDK Loaded !")
    rainbowSDK.initialize(config.applicationID, config.applicationSecret).then(function() {
        console.log("[DEMO] :: Rainbow SDK is initialized!");
    }).catch(function(err) {
        console.log("[DEMO] :: Something went wrong with the SDK...", err);
    });
  };

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    });
=======
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
    this.submitHandler = this.submitHandler.bind(this)
    this.state = {
      messageList: [],
      firstName: "",
      lastName: "",
      language: 0,
      chatMode: 0,
      top: 0,
      user: "",
      password: "",
      status: ""
    };
  }


  onLoadedHandler = () => {
    console.log("[DEMO] :: On SDK Loaded !")
    rainbowSDK.initialize(config.applicationID, config.applicationSecret).then(function () {
      console.log("[DEMO] :: Rainbow SDK is initialized!");
    }).catch(function (err) {
      console.log("[DEMO] :: Something went wrong with the SDK...", err);
    });
  };

  

//------------------------------------------------Form event handlers-----------------------------------------------
  submitHandler = () => {
    console.log(this.state);
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

//------------------------------------------------Launcher event handlers-----------------------------------------------


  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
>>>>>>> Keith
  }

  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
<<<<<<< HEAD
        messageList: [
          ...this.state.messageList,
          {
            author: "them",
            type: "text",
            data: { text }
          }
        ]
      });
    }
  }
  
  /* When user clicks submit, list of events that need to happen. 

  1. To Create Guest User Account
  createAccHandler(): Sends a axios.post to a route in backend that creates a Guest Acc
  That route will also send back guest credentials to frontend for the user to be signed in

  2. IM Service
  
  3. User information will be uploaded to database
    - To Create a axios.post to a specific route 

  4. 
  */



  onClickHandler = () => {
    console.log("Hello world")
    this.setState({
      "firstName": "MinHan"
    })
    axios.post("/", this.state.firstName).then(res => {
      console.log("Upload To Database Successful")
    }).catch(error => {
      console.log(error)
    })
  } 

  /* Connection Services -> User Sign In
    1. Need a axios.post 
    2. 
  */

  /* IM Service - When User sends a message */


  render() {
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: "Agent <Name>",
            imageUrl:
              "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          showEmoji
        />
<<<<<<< HEAD
        <Button onClick={this.onClickHandler}/>
=======
        {/* <Navigation/> */}
=======
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
  }


  /* When use clicks submit, list of events that need to happen. 

  1. To Create Guest User Account
  createAccHandler(): Sends a axios.post to a route in backend that creates a Guest Acc
  That route will also send back guest credentials to frontend for the user to be signed in

  2. IM Service
  
  3. User information will be uploaded to database
    - To Create a axios.post to a specific route 
  */



  // onClickHandler = () => {
  //   axios.post
  // } 

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
          
          <div>
            <Button className="custom-btn" onClick = {this.submitHandler}>
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

>>>>>>> Keith
>>>>>>> 6ffb9ffe58ae8f3f0f20ba9fbee31eb18428b025
      </div>
    );
  }
}

export default App;
