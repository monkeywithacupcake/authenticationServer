const express = require('express');
const http = require('http'); // low level request handling
const bodyParser = require('body-parser'); // parses incoming requests as json
const morgan = require('morgan'); // morgan is logging framework
const mongoose = require('mongoose'); // interacts with mongodb

const router = require('./router');

// DB setup
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup
const app = express();
// setup express
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
// morgan and bodyParser are middle ware in express
router(app);

// Server setup
// communicate with world
const port = process.env.PORT || 3090
const server = http.createServer(app);
server.listen(port);
console.log('server listening on: ', port);
