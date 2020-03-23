import React, { Component } from "react";
import rainbowSDK from "rainbow-web-sdk";
import config from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Typography} from '@material-ui/core';
import axios from "axios";
import { ThemeProvider } from '@livechat/ui-kit';
import Navigation from '../components/Navigation';
import NavTabs from '../components/NavTabs';
import Logo from "../Images/Routingenginelogo.png";

import "./App.css";

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
      <div className = 'main'>
        <div className = 'Navber'>
          <Navigation />
        </div>
        <div className = 'img'>
          <img src = {Logo}/>
        </div>
        <div className = 'NavTabs'> 
        <Container maxWidth='lg'>
        <Typography component="div" style={{ height: 'max' , backgroundColor: '#00205B'}}>
          <NavTabs />
        </Typography>
        </Container>
        </div>
      </div>
    );
  }
}

export default App;
