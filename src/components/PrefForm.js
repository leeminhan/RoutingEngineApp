import React from "react";
import { Grid, Paper, TextField, Container } from '@material-ui/core';
import {Button} from "react-bootstrap";
import Chatradiobutton from './Chatradiobutton';
import Languageradiobutton from './Languageradiobutton';
import Enquiryradiobutton from './Enquiryradiobutton';
import "./Radiobutton.css";

const PrefForm = (props) => {
    return (
        <div className='prefForm'>
          <Container maxWidth = 'lg' > 
          <Paper className = 'gridForm' elevation={3}> 
          <Grid container spacing={0} > 
              <Grid item xs={12} >
                <Paper className = 'formTitle' elevation={3}>
                  <h1 >Connect with our friendly agents! </h1>   
                </Paper>                                                                                                                                                                                                                                                                                                                                                                                            
              </Grid>

              <Grid item xs={12} >
                <br></br>
                <h3 >Enter your name </h3>
                <form noValidate autoComplete="off" class = "nameInput">
                    <TextField  name = "FirstName" onChange = {props.onFNameChange} label="First Name" />
                    <span style={{display: 'inline-block', width: '10px'}} />
                    <TextField  name = "LastName"  onChange = {props.onLNameChange} label="Last Name"  />
                </form>
              </Grid>

              <Grid item xs={12} >
                <br></br>
                <h3 >Select chat mode</h3>
                <Chatradiobutton onChange = {props.onChatModeChange} />
              </Grid>

              <Grid item xs={12} >
                <br></br>
                <h3 > Select language </h3>
                <Languageradiobutton onChange = {props.onLanguageChange} />
              </Grid>

              <Grid item xs={12} >
                <br></br>
                <h3 >  Select category of enquiry </h3>
                <Enquiryradiobutton onChange = {props.onProblemChange}/>
              </Grid>
                
              <Grid item xs={12} >
                <br></br>
                <Button className="submit-btn" onClick = {props.onSubmit}>
                  Submit
                </Button>
                <br></br>
                <span style={{display: 'inline-block', width: '10px'}} />
              </Grid>

              
          </Grid>
          </Paper>
          </Container>
        </div>
    );
}

export default PrefForm;