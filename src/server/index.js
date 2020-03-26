const express = require('express');
const router = express.Router();
const axios = require('axios');
const RainbowSDK = require('rainbow-node-sdk');

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient //gives us access to function necessary to connect to DB to perform CRUD

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'RoutingEngineDB'


// Route to Create Guest Account --> Send back credentials to frontend

// Route to upload new user information to Database
router.post('/upload', (req,res) => {
    const info = req.body()
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
            }).then((result) => {
                console.log(result)
            }).catch((error) => {
                console.log(error)
            })
        })
        res.status(200).send()
    }catch(error){
        res.status(500).send()
    }
})

module.exports =  router;