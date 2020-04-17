const express = require('express');
const router = new express.Router();
const db = require('./db')

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
            // console.log("Login Credentials:\n" , loginCredentials)
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
router.post('/users',async(req,res) => {
    const userInfo = req.body
    try{
        await db.insertHandler(userInfo, "user")
        console.log("Successfully inserted to database:", userInfo)
        // console.log("Uploaded to userInfo to DB:", userInfo)
        res.status(200).send()
    }catch(error){
        res.status(500).send()
    }
})

router.post('/agents', async(req,res) => {
    const userInfo = req.body
    const query = {
        top: userInfo.top
    }
    console.log("userInfo:", query)
    
    try{
        const agent = await db.findHandler(query, 'agent')
        console.log("Agent Route: Successfully queried database. Result:\n", agent)
        console.log("agentID:", agent.agentId)
        
        const agentAvailability = await checkAgentStatusHandler(agent.agentId)
        console.log("agentAvailability", agentAvailability)
        
        if(agentAvailability == 'online'){
            // Update agent availbility/status to DB?
            console.log(`Agent ${agent.agentId} is available. Connecting with user now!`)
            res.status(200).send({agentId: agent.agentId, presence: agentAvailability})
        }
        res.status(200).send()
        // if(agent.top == 'busy'){

        // }

        // MongoClient.connect(connectionURL, {useNewUrlParser: true}, async(error, client) => {
        //     if(error){
        //         return console.log("Unable to connect to database")
        //     }
        //     console.log("Agent Route: Connected to Agent's Database successfully!")
        //     const db = client.db(databaseName)

        //     // 1. Look for agent with matching TOP
        //     // found: -> then block: check agent availbility 
        //     // -> if yes, return agentId to frontend as input for searchByIdHandler to get agentObject to openConvo
        //     // 
        //     // not found: -> catch error block

        //     db.collection('agent').findOne({ //note to self: .find no longer works; documentation not updated
        //         top: userInfo.top
        //     }).then(async(agentDb) => {
        //         console.log("Found Agent with matching TOP! Checking availability -----")
        //         console.log("AgentDB result:", agentDb)
        //         // Check agent availability

        //         const agentId = agentDb.agentId
        //         // console.log("AgentId:", agentId) 
        //         // const temp1 = "5e5fdf3bd8084c29e64eb20a"
        //         // const temp = "5e84513235c8367f99b94cee"
                
        //         const availability = await checkAgentStatusHandler(agentId)
        //         console.log("Agent's Availability:", availability)
            
        //         if(availability == "online"){
        //             // Match agent to user -> Update agent to busy
        //             db.collection('agent').updateOne({
        //                 agentId: agentId
        //             },{
        //                 $set:{
        //                     availability: "busy" 
        //                 }
        //             }).then((result) => {
        //                 console.log("Agent Availability Updated:", result)
        //             }).catch(error => {
        //                 console.log("Failed to update agent")
        //                 console.log(error)
        //             })
        //             res.status(200).send(availability)
        //         }
                
        //         // res.status(200).send(availability)

        //     }).catch((error) => {
        //         console.log("No Agent with matching TOP found!")
        //         console.log(error)
        //     })    
        // })



    }catch(error){
        console.log("\n/agents route: Failed to Connect to MongoDB")
        res.status(500).send()
    }
})

module.exports =  router;