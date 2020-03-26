import React, { useState } from "react";
import { Grid, Paper, Container, Typography, TextField } from '@material-ui/core';
import {Button} from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import Chatradiobutton from './Chatradiobutton';
import Languageradiobutton from './Languageradiobutton';
import Enquiryradiobutton from './Enquiryradiobutton';
import "./Radiobutton.css";





//------------------------------Styling for the form ---------------------------------------------------------------------
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },

    paper: {
        padding: theme.spacing(2),
        // textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: "transparent",
        alignContent: 'center',
      },
    
    title: {
        color: 'black',
        textAlign: 'center',

        
    },

  }));

//--------------------------------Preference form for users-------------------------------------------------------------
const PrefForm = (props) => {
    const classes = useStyles();

    // Store states and handle input changes
    const [chatMode, setChatMode] = useState('');
    const [problem, setProblem] = useState('');
    const [language, setLanguage] = useState(''); 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const handleChangeChatMode = event => setChatMode(event.target.value);
    const handleChangeProblem = event => setProblem(event.target.value);
    const handleChangeLanguage = event => setLanguage(event.target.value);
    const handleChangeFirstName = event => setFirstName(event.target.value);
    const handleChangeLastName = event => setLastName(event.target.value);
    
    return ( 
        <div className={classes.root}>
            <Paper className={classes.paper}> 
                <Grid container spacing={4} alignItems='center'>
                    <Grid item xs={12} >
                        <h2 className = "formtitle" >Have questions regarding your CPF? Connect with our friendly agents! </h2>                                                                                                                                                                                                                                                                                                                                                                                                                
                    </Grid>
                    <Grid item xs={12}>  
                        <h3 className = "formtitle">Enter your name </h3>
                        <form noValidate autoComplete="off" class = "nameInput">
                            <TextField  name = "FirstName" onChange = {handleChangeFirstName} label="First Name" />
                            <span style={{display: 'inline-block', width: '10px'}} />
                            <TextField  name = "LastName" onChange = {handleChangeLastName} label="Last Name"  />
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 className = "formtitle">Select chat mode</h3>
                        <Chatradiobutton chatMode ={chatMode} onChangeChatMode={handleChangeChatMode}/>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 className = "formtitle">Select language </h3>
                        <Languageradiobutton language = {language} onChangeLanguage = {handleChangeLanguage}/>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 className = "formtitle">  Select category of enquiry </h3>
                        <Enquiryradiobutton problem = {problem} onChangeProblem = {handleChangeProblem} />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button 
                        className="custom-btn" 
                        onClick={() =>  props.statesCallBack(firstName, lastName, language, chatMode, problem)}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Paper>  
        </div>
    );
}
export default PrefForm;
    


