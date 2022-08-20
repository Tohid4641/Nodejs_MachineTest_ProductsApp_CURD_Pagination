// Use Express.js Framework
const express = require('express');
const app = express();

// Require bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//dotenv file access require
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });

// Require db connection
require('./db/connection.js');

//Require routes
const product = require('./routes/product.route');
app.use('/productsApp', product);

//Require port
const PORT = process.env.PORT;

// Server Listening...
app.listen(PORT,function(){
    console.log(`Server is listening on port ${PORT}....`);
});