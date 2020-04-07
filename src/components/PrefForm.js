import React from "react";
import { Grid, TextField } from '@material-ui/core';
import {Button} from "react-bootstrap";
import Chatradiobutton from './Chatradiobutton';
import Languageradiobutton from './Languageradiobutton';
import Enquiryradiobutton from './Enquiryradiobutton';
import "./Radiobutton.css";

const PrefForm = (props) => {
    return (
        <div className='prefForm'>
          <div className = 'formTitle' >
            <hr className = 'dividerHor' />
            <hr className = 'dividerVer'/>
            <br></br>  <br></br>
            <h1>CONNECT WITH OUR AGENTS</h1>   
            <br></br> <br></br> <br></br> <br></br>
            <img className = 'agentIcom'
              src={require('../Images/Agenticon.svg')}
              width="150"
              height="150"
            />
            <br></br> <br></br> <br></br> <br></br>
            <h5> If you have any CPF related enquiries, fill up the form below <br> 
            </br>and we will connect you to one of our agents who will assist you</h5>
          </div>                                                                                                                                                                                                                                                                                                                                                                                          

          <div className = 'nameInput'>
            <hr className = 'dividerHor' />
            <hr className = 'dividerVer'/>
            <br></br> <br></br>
            <Grid container spacing = {1}>
              <Grid className = 'leftTitle' item xs = {6}>
                <h1>ENTER</h1>   
              </Grid>
              <Grid className = 'rightTitle' item xs = {6}>
                <h1>NAME</h1>   
              </Grid>
            </Grid>
            <br></br> <br></br> <br></br><br></br> <br></br> <br></br> 
            <form noValidate autoComplete="off" >
                <TextField size = 'medium' className = "FirstName" onChange = {props.onFNameChange} label="First Name"  variant = 'filled'/>
                <span style={{display: 'inline-block', width: '30px'}} />
                <TextField size = 'medium' className = "LastName"  onChange = {props.onLNameChange} label="Last Name"  variant = 'filled'  />
            </form>
          </div>

          <div className = 'chatInput'>
            <hr className = 'dividerHor' />
            <hr className = 'dividerVer'/>
            <br></br> <br></br>
            <Grid container spacing = {1}>
              <Grid className = 'leftTitle' item xs = {6}>
                <h1>SELECT</h1>   
              </Grid>
              <Grid className = 'rightTitle' item xs = {6}>
                <h1>CHAT MODE</h1>   
              </Grid>
            </Grid>
            <br></br> <br></br> <br></br> <br></br>
            <Chatradiobutton onChange = {props.onChatModeChange} />
          </div>

          <div className = 'languageInput'>
            <hr className = 'dividerHor' />
            <hr className = 'dividerVer'/>
            <br></br> <br></br>
            <Grid container spacing = {1}>
              <Grid className = 'leftTitle' item xs = {6}>
                <h1>SELECT</h1>   
              </Grid>
              <Grid className = 'rightTitle' item xs = {6}>
                <h1>LANGUAGE</h1>   
              </Grid>
            </Grid>
            <br></br> <br></br><br></br> <br></br><br></br> <br></br>
            <Languageradiobutton onChange = {props.onLanguageChange} />
          </div>

          <div className = 'problemInput'>
            <hr className = 'dividerHor' />
            <hr className = 'dividerVer'/>
            <br></br> <br></br>
            <Grid container spacing = {1}>
              <Grid className = 'leftTitle' item xs = {6}>
                <h1>SELECT</h1>   
              </Grid>
              <Grid className = 'rightTitle' item xs = {6}>
                <h1>ENQUIRY</h1>   
              </Grid>
            </Grid>
            <br></br> <br></br><br></br> <br></br><br></br> <br></br>
            <Enquiryradiobutton onChange = {props.onProblemChange}/>
          </div>
                
          <div className = 'submit'>
            <hr className = 'dividerHor' />
            <hr className = 'dividerVer'/>
            <br></br> <br></br>
            <Button className="submit-btn" size ='lg' onClick = {props.onSubmit}>
              Submit
            </Button>
            <br></br> <br></br>
            <h5> Please give us some time while we connect you to a suitable agent.</h5>
          </div>
        </div>
    );
}

export default PrefForm;