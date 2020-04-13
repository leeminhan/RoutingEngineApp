const express = require('express');
const router = new express.Router();
const axios = require('axios');

const options = require('./options');
const RainbowSDK = require('rainbow-node-sdk');
const timeTolive = 3600;

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient //gives us access to function necessary to connect to DB to perform CRUD
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'RoutingEngineDB'

const rainbowSDK = new RainbowSDK(options);
rainbowSDK.start();
rainbowSDK.events.on('rainbow_onready', function() {
    // do something when the SDK is connected to Rainbow
    console.log('Successfully connected to rainbow NodeSDK')
});

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 2 // limit each IP to 1 requests per windowMs
});

const checkAgentStatusHandler = async(agentId) => {
    // Need to put this somewhere I can constantly ping 
    // NodeSDK API: admin.getContactInfos(userId) -> returns Contact object

    try{
        const contact = await rainbowSDK.contacts.getContactById(agentId, true);
        const presence = contact.presence;
        // console.log("Contact:", contact)
        // console.log("presence:", presence)
        
        return presence
    }catch(error){
        console.log(error)
    }
}

/* Admin Service - Create Annoymous Guest Account For User*/
router.post("/", (req,res) => {
    try{
        rainbowSDK.admin.createAnonymousGuestUser().then((loginCredentials) => {
            console.log("Guest User Account successfully created")
            console.log("Login Credentials:\n" , loginCredentials)
            res.status(200).send(loginCredentials)
        }).catch((error)=>{
            console.log(`Failed to Create Guest Account; Error: ${error}`)
        })

    }catch(error){
        res.status(404).send(error)
        console.log("Creating of Guess Account Failed")
    }
})

// Route to upload new user information to Database
router.post('/users',(req,res) => {
    const userInfo = req.body
    console.log(userInfo)
    try{
        MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
            if(error){
                return console.log("Unable to connect to database")
            }
            console.log("Connected to Database successfully!")
        
            const db = client.db(databaseName)
            
            db.collection('user').insertOne({
                userInfo
            }).then((result) => {
                res.status(200).send(userInfo)
            }).catch((error) => {
                console.log(error)
            })
        })
    }catch(error){
        res.status(500).send()
    }
})

router.post('/agents', (req,res) => {
    const userInfo = req.body

    // 1. Check Agent's TOP and Availabiliity 
    try{
        MongoClient.connect(connectionURL, {useNewUrlParser: true}, async(error, client) => {
            if(error){
                return console.log("Unable to connect to database")
            }
            console.log("Agent Route: Connected to Agent's Database successfully!")
            const db = client.db(databaseName)

            // 1. Look for agent with matching TOP
            // found: -> then block: check agent availbility 
            // -> if yes, return agentId to frontend as input for searchByIdHandler to get agentObject to openConvo
            // 
            // not found: -> catch error block

            
            db.collection('agent').findOne({ //note to self: .find no longer works; documentation not updated
                top: userInfo.top
            }).then(async(agentDb) => {
                console.log("Found Agent with matching TOP! Checking availability -----")
                console.log("AgentDB result:", agentDb)
                // Check agent availability

                const agentId = agentDb.agentId
                // console.log("AgentId:", agentId) 
                // const temp1 = "5e5fdf3bd8084c29e64eb20a"
                // const temp = "5e84513235c8367f99b94cee"
                const availability = await checkAgentStatusHandler(agentId)
                console.log("Agent's Availability:", availability)

                if(availability == "online"){
                    // Match agent to user -> Update agent to busy
                    db.collection('agent').updateOne({
                        agentId: agentId
                    },{
                        $set:{
                            availability: "busy" 
                        }
                    }).then((result) => {
                        console.log("Agent Availability Updated:", result)
                    }).catch(error => {
                        console.log("Failed to update agent")
                        console.log(error)
                    })
                    res.status(200).send(availability)
                }
                
                // res.status(200).send(availability)

            }).catch((error) => {
                console.log("No Agent with matching TOP found!")
                console.log(error)
            })    
        })
    }catch(error){
        res.status(500).send()
    }

    // if yes

    // else put into the queue
})

module.exports =  router;