import React, { Component } from "react";
import rainbowSDK from "rainbow-web-sdk";
import config from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { ThemeProvider } from '@livechat/ui-kit';


//------------------------------------------------Components----------------------------------------------------git
import Navbar from '../components/Navbar';
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
      firstName: null,
      lastName: null,
      language: null,
      chatMode: null,
      top: null,
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
            author: this.state.firstName + this.state.lastName,
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
