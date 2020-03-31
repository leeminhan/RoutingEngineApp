const express = require('express');
const index = require('./index');
const options = require('./options');
const RainbowSDK = require('rainbow-node-sdk');


const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

// const rainbowSDK = new RainbowSDK(options);
// rainbowSDK.start();

// rainbowSDK.events.on('rainbow_onready', function() {
//     // do something when the SDK is connected to Rainbow
//     console.log('Successfully connected to rainbow NodeSDK')
// });

// Managing User & Guests

// Create agent accounts on rbw CLI first 

// IM Service

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());  
app.use(cors());
app.use('/', index);
app.use('/users', index);

app.listen(8000, () => {
    console.log('App running on port 8000');
});

module.exports = app;
