const express = require('express');
const index = require('./index');
const options = require('./options');
const RainbowSDK = require('rainbow-node-sdk');

const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000 //production_port or local_port

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());  
app.use(cors());
app.use('/', index);
app.use('/users', index);

app.listen(port, () => {
    console.log('App running on port ', port);
});

module.exports = app;