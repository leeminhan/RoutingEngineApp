const express = require('express');
const router = new express.Router();
const axios = require('axios');
const RainbowSDK = require('rainbow-node-sdk');

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient //gives us access to function necessary to connect to DB to perform CRUD

const connectionURL = 'mongodb://localhost:27017'
const databaseName = 'RoutingEngineDB'

const queue = [] //Global Variable.
const queue2 = [] //Global Variable.
const queue3 = [] //Global Variable.
const queue4 = [] //Global Variable.

// Route to Create Guest Account --> Send back credentials to frontend

// Route to upload new user information to Database

//---------------------------------  HTTP REQUEST '/users' Handler START ------------------------------------------------------------------
router.post('/users', (req,res) => {
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
router.post('/connect', (req,res) => {
    const info = req.body
    console.log(info)
    queue.push(info.firstname)
    console.log(queue)

    /*
        1) First check agent is available
            1.1) Find agent in rainbowSDK first
            1.2) Try to connect/create conversation
            1.3) Remove them from queue , queue.shift();
        2) If agent not avaiable continue wait in queue
        3) If available
        4) 
    */
})

//---------------------------------  HTTP REQUEST '/connect' Handler END ----------------------------------------------------
module.exports =  router;