require('dotenv').config()

const express = require('express');
const indexRouter = require('./index');
const RainbowSDK = require('rainbow-node-sdk');
const options = require('./options'); // Import Configurations
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

// Instantiate 
// const rainbow = new RainbowSDK(options);
const timeTolive = 3600;


// Create agent accounts on rbw CLI first 

// IM Service

// 1. Startup Rainbow SDK ----------------------------
// rainbow.start().then(() => {
//     // Do something when the SDK is connected to Rainbow
//     console.log('Connected to Rainbow')
// });

// Middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());  
app.use(indexRouter);

/* Admin Service - Create Guest Account For User*/
// app.post("/", async(req,res) => {
//     try{
//         //Uncomment this once post from frontend to this route is done
//         // Change to req.body once done
//         const firstName = "firstName";
//         const lastName = "lastName";
//         const language = "en-US";
//         // console.log(req.body)
//         //Consider changing to async await once done with other routes

//         rainbow.admin.createGuestUser(firstName, lastName, [language],[timeTolive]).then((loginCredentials) => {
//             console.log("Guest User Account successfully created")

//             //Send back details to frontend for User to Login with Guest User Account
//             res.status(200).send(loginCredentials)

//         }).catch((error)=>{
//             console.log(`Failed to Create Guest Account; Error: ${error}`)
//         })

//     }catch(error){
//         res.status(404).send(error)
//         console.log("Creating of Guess Account Failed")
//     }
// })

app.listen(8000, () => {
    console.log('App running on port 8000');
});

module.exports = app;
