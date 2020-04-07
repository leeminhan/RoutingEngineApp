const express = require('express');
// const app = express();
const router = new express.Router();
const axios = require('axios');


const options = require('./options');
const RainbowSDK = require('rainbow-node-sdk');

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient //gives us access to function necessary to connect to DB to perform CRUD

const connectionURL = 'mongodb://localhost:27017'
const databaseName = 'RoutingEngineDB'

const rateLimit = require("express-rate-limit");



//limiter = require('express-limiter')(router, mongodb)
// var mycollection = db.collection('user')
// var limiter = require('express-limiter')(mycollection, 'mongodb')

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 1 // limit each IP to 1 requests per windowMs
  });
   
  //  apply to all requests
  //app.use(limiter);

const rainbowSDK = new RainbowSDK(options);
rainbowSDK.start();
rainbowSDK.events.on('rainbow_onready', function() {
    // do something when the SDK is connected to Rainbow
    console.log('Successfully connected to rainbow NodeSDK')
});

// //setting of limiter
// limiter({
//     method: 'post',
//     lookup: ['connection.remoteAddress'],
//     // 1 requests per min
//     total: 1,
//     expire: 60000
//   })


/* Admin Service - Create Guest Account For User*/
router.post("/", limiter, (req,res) => {
    try{
        rainbowSDK.admin.createAnonymousGuestUser().then((loginCredentials) => {
            console.log("Guest User Account successfully created")
            console.log(loginCredentials)
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
router.post('/users', limiter, (req,res) => {
    const info = req.body
    console.log(info)

    queue.push(info.firstName)
    console.log(queue)
    //const firstperson = queue.shift()
    try{
        MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
            if(error){
                return console.log("Unable to connect to database")
            }
            console.log("Connected correctly!")
        
            const db = client.db(databaseName)
            
            db.collection('user').insertOne({
                info
                // firstName:"firstName",
                // lastName: "lastName",
                // chatMode: "chat",
                // top: "CPF Pay Out/ Maybe problem 1"//top: type of problem
            }
            
            ).then((result) => {
                console.log(result)
            }).catch((error) => {
                console.log(error)
            })

        })
        res.status(200).send(info)
    }catch(error){
        res.status(500).send()
    }
})
//---------------------------------  HTTP REQUEST Handler END ------------------------------------------------------------------

//---------------------------------  HTTP REQUEST '/connect' Handler START -----------------------------------------------------------------
// router.post('/connect', (req,res) => {
//     const info = req.body
//     console.log(info)
//     queue.push(info.firstname)
//     console.log(queue)

    /*
        1) First check agent is available
            1.1) Find agent in rainbowSDK first
            1.2) Try to connect/create conversation
            1.3) Remove them from queue , queue.shift();
        2) If agent not avaiable continue wait in queue
        3) If available
        4) 
    */
// })

module.exports = router;
