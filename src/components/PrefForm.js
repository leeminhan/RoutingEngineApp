import React from "react";
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
      },
    
    title: {
        color: 'black',
        textAlign: 'left',
        
    },

  }));
// ------------------------------------------------------------------------------------------------------------------------

//Preference form for users
const PrefForm = props => {
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <Paper className={classes.paper}> 
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h2 className = {classes.title}>Have questions regarding your CPF? Connect with our friendly agents! </h2>                                                                                                                                                                                                                                                                                                                                                                                                                
                    </Grid>
                    <Grid item xs={12}>  
                        <h3 className = {classes.title}>Enter your name </h3>
                        <form noValidate autoComplete="off">
                            <TextField  name = "FirstName" label="First Name" /> <br></br>
                            <TextField  name = "LAstName" label="Last Name"  />
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 className = {classes.title}>  Select category of enquiry </h3>
                        <Enquiryradiobutton/>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 className = {classes.title}>Select chat mode</h3>
                        <Chatradiobutton/>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 className = {classes.title}>Select language </h3>
                        <Languageradiobutton/>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button className="custom-btn" >Submit</Button>
                    </Grid>
                </Grid>
            </Paper>  
        </div>
    );
}
export default PrefForm;
    


