import React, { Component } from "react";
import rainbowSDK from "rainbow-web-sdk";
import config from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { ThemeProvider } from '@livechat/ui-kit';


//------------------------------------------------Components----------------------------------------------------
import { Grid, Paper, TextField, Container, Box } from '@material-ui/core';
import {Button} from "react-bootstrap";
import Navigation from '../components/Navigation';
import PrefForm from '../components/PrefForm';
import CPFBoard from "../components/CPFBoard";
import Aboutus from '../components/Aboutus';
import Agents from '../components/Agents';
import FAQ from '../components/FAQ';
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
      status: "",
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
    // this.onLoadedHandler();
    // this.createGuestAccHandler();
    // this.uploadDatabaseHandler();
    // this.createChatHandler(); //fill in someones ID
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
    this.setState({language: event.target.value});
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
      console.log(result);
      this.setState({user : result.data.guestID});
      this.setState({password : result.data.guestPass});
    }).catch(error => {
      console.log(error);
    })

    rainbowSDK.connection.signin(this.state.user,this.state.password).then((guestAccount) =>{
      console.log(guestAccount, "account signed in");
    }).catch(error => {
      console.log(error, "failed to sign guest in");
    })
  }

  createChatHandler = (agentID) => {
    
    //ID to be retrieved from database
    rainbowSDK.contacts.searchContactById(agentID).then((contact) => {
      console.log(contact, "agent contact");
      this.setState({agentContact : contact});
    }).catch(error => {
      console.log(error, "failed to get agent contact");
    })

    rainbowSDK.conversations.openConversationForContact(this.state.agentContact).then((convo) => {
      console.log(convo, "conversation created");
      this.setState({conversation: convo});
      rainbowSDK.im.sendMessageToConversation(convo, "Thank you for calling. How may I help you?");
    }).catch(error => {
      console.log(error, "failed to start conversation");
    })
  }

  
  // connectGuestToAgent = async(agentID) => {
  //   const user_info = {
  //     firstName: this.state.firstName,
  //     lastName: this.state.lastName,
  //     language: this.state.language
  //   }

  //   // Create a guest account in the backend
  //   const guestCredentials = await axios.post("/", user_info);
  //   console.log("guest account created", guestCredentials);
  //   const guestUserID = guestCredentials.loginEmail;
  //   const guestPW = guestCredentials.password;

  //   // Sign in the guest using the retrieved credentials
  //   const guestAccount = await rainbowSDK.connection.signin(guestUserID,guestPW);
  //   console.log("guest signed in", guestAccount);

  //   // Retrieve the assigned agent
  //   const agentContact = await rainbowSDK.contacts.searchContactById(agentID);
  //   console.log("retrieved agent contact", agentContact);

  //   // Create conversation room between guest and agent
  //   const convo = await rainbowSDK.conversations.openConversationForContact(agentContact);
  //   console.log("conversation created", convo);

  //   // Send message to convo
  //   rainbowSDK.im.sendMessageToConversation(convo,"Lets talk");

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

      if (this.state.conversation != null) {
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

        {/* Navigation bar */}
        <div className='Navbar'>
          <Navigation />
        </div>

        {/* Background image and title */}
        <div className='home'>
          <span className = 'title'>
            <h1> CPF Help Centre</h1>
            <h2>Your one stop destination to find  <br>
            </br>out all about the CPF scheme. <br> 
            </br>Connect with our friendly agents<br>
            </br>and they will tend to your queries.</h2>
          </span>
        </div>

        {/* Website sections */}
        <div className='sections'>
          <PrefForm
            onFNameChange = {this.onFirstNameChangeHandler.bind(this)}
            onLNameChange = {this.onLastNameChangeHandler.bind(this)}
            onChatModeChange = {this.onChatModeChangeHandler.bind(this)}
            onLanguageChange = {this.onLanguageChangeHandler.bind(this)}
            onProblemChange = {this.onProblemChangeHandler.bind(this)}
            onSubmit = {this.submitHandler.bind(this)}
          />
          <Launcher
              agentProfile={{
                teamName: `Let's Be Team Players`,
                imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
              }}
              onMessageWasSent={this._onMessageWasSent.bind(this)}
              messageList={this.state.messageList}
              showEmoji
          />
          <CPFBoard/>
          <Aboutus/>
          <Agents/>
          <FAQ/>
        </div>

      </div>
    );
  }
}

export default App;
