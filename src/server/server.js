require('dotenv').config()

const express = require('express');
const RainbowSDK = require('rainbow-node-sdk');
const options = require('./options'); // Import Configurations

const app = express();
const mongoose = require('mongoose');

const rainbow = new RainbowSDK(options);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.listen(8000, function() {
    console.log('App running on port 8000');
});

require('dotenv').config()






// Create accounts on rbw CLI first 
// Admins Service
// IM Service


// 1. Start the SDK
rainbow.start().then(() => {
    // Do something when the SDK is connected to Rainbow
    // ... 
    console.log('Connected to Rainbow')
});

app.listen(8000, function() {
    console.log('App running on port 8000');
});

module.exports = app;
