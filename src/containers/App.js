import React, { Component } from "react";
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
        <Button onClick={this.onClickHandler}/>
      </div>
    );
  }
}

export default App;
