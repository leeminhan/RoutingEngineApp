const express = require('express');
const router = new express.Router();
const db = require('./db')

const options = require('./options');
const RainbowSDK = require('rainbow-node-sdk');
const timeTolive = 3600;

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
    console.log(db)
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
            console.log(`Agent ${agent.agentId} is available. Connecting with user now!`)
            res.status(200).send({agentId: agent.agentId, presence: agentAvailability})
        }else{
            console.log(`Agent ${agent.agentId} is unavaiable.`)
            res.status(200).send({agentId: agent.agentId, presence: agentAvailability})
        }
    }catch(error){
        console.log("\n/agents route: Failed at /agents route")
        res.status(500).send()
    }
})

router.post('/agents/reattempt', async(req, res) => {
    const userInfo = req.body
    const query = {
        top: userInfo.top
    }
    console.log("userInfo:", query)
    try{
        console.log("\n In /agents/reattempt route")
        
        // Find next user in queue for a specific TOP based on shortest Timestamp
        const userNextInQue = await db.findConditionHandler(query, 'user')
        console.log("\n User Next In Queue", userNextInQue)

        //check if im the next user
        if(userInfo.timestamp == userNextInQue.timestamp){
            //Find agent with same TOP
            const agent = await db.findHandler(query, 'agent')
            console.log("agentID:", agent.agentId)

            //Check aget avaialbility
            const agentAvailability = await checkAgentStatusHandler(agent.agentId)
            console.log("agentAvailability", agentAvailability)

            if(agentAvailability == 'online'){
                // Update agent availbility/status to DB?
                console.log(`Agent ${agent.agentId} is available. Connecting with user now!`)
                res.status(200).send({agentId: agent.agentId, presence: agentAvailability})
                //should send a toConnect property instead
            
            }
        }else{ //Not the next user defo should still continue to wait
            console.log("Agent is unavaiable. Please wait!")
            res.status(200).send()
        }
    }catch(error){
        console.log("\n/agents/reattempt route: Failed /agents/reattempt route")
        console.log(error)
        res.status(500).send()
    }
})

// Route to remove user from database/queue once user is done with the call
router.post('/users/delete', async(req,res) => {
    const timestamp = req.body.timestamp
    const query = {
        timestamp: timestamp
    }

    console.log(query)
    try{
        await db.deleteHandler(query, 'user')
        console.log('\n /users/delete route: user deleted')
        res.status(200).send()
    }catch(error){
        console.log(error)
        res.send(500).send()
    }
})

// Route to clear all users from database
router.post('/clearUsers', (req,res) => {
    
})

module.exports =  router;