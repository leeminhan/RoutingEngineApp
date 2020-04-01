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
      user: "",
      password: "",
      status: "",
      conversation: null,
    }
    initialize();
  }

//------------------------------------------------Form event handlers-----------------------------------------------
  submitHandler = () => {
    this.uploadDatabaseHandler()
    this.createGuestAccHandler()
    // this.openConversationHandler()
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
  
  uploadDatabaseHandler = () =>{
    axios.post("http://localhost:8000/users", this.state).then(() => {
      console.log("Client: Uploaded user information to Database")
    }).catch(error => {
      console.log(error)
    })
  }
  
  createGuestAccHandler = () => {
    axios.post("http://localhost:8000/").then((loginCredentials) => {
      console.log('Client: Guest User Account created')

      const strLogin = loginCredentials.data.loginEmail
      const strPassword = loginCredentials.data.password

      rainbowSDK.connection.signin(strLogin, strPassword).then(account => {
        this.openConversationHandler()
        console.log('Signed IN!', account)
      }).catch(error => {
        console.log(error)
      })
    }).catch(error => {
      console.log(error)
    })
  }

   openConversationHandler = () => {
    // const contact = agentid from retrieved rbw CLI

    // 1. Search Agent ID -> object
    // 2. openConversationForContact(object)
    // 3. IM service: sendMessage to 

    const agentStrId = "5e84513235c8367f99b94cee"
    rainbowSDK.contacts.searchById(agentStrId).then((agentObject) => {
      console.log('Client: Found Agent:', agentObject)
      return agentObject
    }).then((agentObject) => {

      rainbowSDK.conversations.openConversationForContact(agentObject).then((conversation) => {
        console.log(`Client: Successful openConversation: ${conversation}`)
        console.log(conversation.id)
        const strMessage = 'Hi There'
        // this.sendMessageHandler(conversation, strMessage)
        rainbowSDK.im.sendMessageToConversation(conversation, strMessage)
        console.log('send message success')
      }).catch(error => {
        console.log('Client: Failed to openConversation')
      })

    }).catch(error => {
      console.log('Client: Failed to find Agent id')
      console.log(error)
    })
  }

  // sendMessageHandler = (conversation, strMessage) => {
  //   rainbowSDK.im.sendMessageToConversation(conversation, strMessage).then((result) => {
  //     console.log("Client: IM:", result)
  //   }).catch((error) => {
  //     console.log("IM failed")
  //   })
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
