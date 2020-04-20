const express = require('express');
// const proxy = require('http-proxy-middleware')
const index = require('./index');
// const options = require('./options');
// const RainbowSDK = require('rainbow-node-sdk');

const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
// const port = process.env.PORT || 8000 //production_port or local_port

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());  
app.use(cors());
app.use('/', index);
app.use('/users', index);

// app.use(express.static('./build'))
// app.listen(process.env.PORT || 8000)

// app.listen(port, () => {
//     console.log('App running on port ', port);
// });

app.listen(8000, () => {
    console.log('App running on port 8000');
});

module.exports = app;



// module.exports = function(app) {
//     // add other server routes to path array
//     app.use(proxy(['/api' ], { target: 'http://localhost:3000' }));
// } 