// implement your API here
const express = require('express');

//imports user module which contains our api methods
const users = require('./data/db.js');

//creates express server
const server = express();

//teaches server to speak JSON
server.use(express.json());//Need this for post and put

server.get('/', (req, res) => {
    res.send('hello from node-api1-project')
})

//add user with post and Insert api method
server.post('/api/users', (req, res) => {
    const userData = req.body;

    users.insert(userData).then(user => {
        res.json(user)
    }).catch(err => {
        res.json({ message: 'error adding user' });
    });
});

server.get('/api/users', (req,res) => {
    //get a list of users from the database
    users.find().then(user => {
        //send the list of users to the client
        res.send(user);
    }).catch(err => {
        res.send(err)
    })
})

const port = 8000;
//listening for connections
server.listen(port, () => console.log(`\nlistening on port ${port}\n`))