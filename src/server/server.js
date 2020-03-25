const express = require('express');
const RainbowSDK = require('rainbow-node-sdk');
const options = require('./options'); // Import Configurations
const indexRouter = require('./index');

const app = express();

// Instantiate 
const rainbow = new RainbowSDK(options);

//Fake Guest Account Data:
const firstName = "minhan";
const lastName = "lee";
const language = "en-us";
const timeTolive = "1800";

// Managing User & Guests

// Create agent accounts on rbw CLI first 

// IM Service

// 1. Startup Rainbow SDK ----------------------------
rainbow.start().then(() => {
    // Do something when the SDK is connected to Rainbow
    // ... 
    console.log('Connected to Rainbow')
});

// Middleware
app.use(express.json())
app.use(indexRouter);

/* Admin Service - Create Guest Account For User*/
app.post("/", async(req,res) => {
    try{
        //Uncomment this once post from frontend to this route is done
        // const firstName = req.firstName;
        // const lastName = req.lastName;
        // const language = req.language;
        console.log(req.body)
        // rainbow.admin.createGuestUser(firstName, lastName, [language],[timeTolive]).then(() => {
        //     console.log("Guest User Account successfully created")

        //     //Send back details to frontend for User to Login with Guest User Account

        // }).catch((error)=>{
        //     console.log(`Failed to Create Guest Account; Error: ${error}`)
        // })
    }catch(error){
        res.status(404).send(error)
        console.log("Creating of Guess Account Failed")
    }
})

app.listen(8000, () => {
    console.log('App running on port 8000');
});

module.exports = app;
