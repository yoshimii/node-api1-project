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


server.post('/api/users', (req, res) => {
    const userData = req.body;

    //add user with post and Insert api method
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
    });
});


server.get('/api/users/:id', (req,res) => {
    const id = req.params.id;

    //get a user by id and return user object
    users.findById(id).then(user => {
        res.json(user);

    }).catch(err => {
        res.json({ message: 'error finding user by id' });
    });
});

server.delete('/api/users/:id', (req,res) => {
    const id = req.params.id;

    //delete a user by id and return deleted user
    users.remove(id).then(user => {
        res.json(user);

    }).catch(err => {
        res.json({ message: 'error deleting user by id' });
    });
});



const port = 8000;
//listening for connections
server.listen(port, () => console.log(`\nlistening on port ${port}\n`))