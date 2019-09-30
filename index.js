// implement your API here
const express = require('express');

//imports user module which contains our api methods
const users = require('./data/db.js');

//creates express server
const server = express();

const port = 8000;



//listening for connections
server.listen(port, () => console.log(`\nlistening on port ${port}\n`))