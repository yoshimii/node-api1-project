// implement your API here
const express = require('express');

//imports user module which contains our api methods
const users = require('./data/db.js');

//creates express server
const server = express();

//teaches server to speak JSON
server.use(express.json());//Need this for post and put

server
.get('/', (req, res) => {
    res.send('hello from node-api1-project')

})

server
.post('/api/users', (req, res) => {
    const userData = req.body;
    //add user with post and Insert api method
    if(!userData.name || !userData.bio) {
        res.status(400).json({ message: 'incomplete inquiry, missing name and or bio'})
    }else {
        users
        .insert(userData)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).res.json({ message: 'The user information could not be retrieved' });
        });
    }
});

server
.get('/api/users', (req,res) => {
    //get a list of users from the database
    users
    .find()
    .then(user => {
        //send the list of users to the client
        res.send(user);
    }).catch(err => {
        res.status(500).res.json({ message: 'The user information could not be retrieved' });
    });
});

server
.get('/api/users/:id', (req,res) => {
    const id = req.params.id;
    //get a user by id and return user object

    if(users.findById(!id)) {
        res.status(404).json({ message: 'The user with the specified ID does not exist' })
    } else {
        users
        .findById(id)
        .then(user => {
            res.json(user);
        }).catch(err => {
            res.status(500).res.json({ message: 'The user information could not be retrieved' });
        });
    }
});

server
.delete('/api/users/:id', (req,res) => {
    const id = req.params.id;
    //delete a user by id and return deleted user
    users
    .remove(id)
    .then(user => {
        res.json(user);
    }).catch(err => {
        res.status(500).res.json({ message: 'The user information could not be retrieved' });
    });
});

server
.put('/api/users/:id', (req,res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    //edit a user by id and returns the edited user object
    users
    .update(id, updatedUser )
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res.status(500).res.json({ message: 'The user information could not be retrieved' });
    });
});

const port = 8000;
//listening for connections
server.listen(port, () => console.log(`\nlistening on port ${port}\n`))