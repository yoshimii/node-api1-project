import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import User from './components/User';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import UpdateUser from './components/UpdateUser';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users').then(res => {

        setUsers(res.data);
    }).catch(err => {
        console.log(err, 'error')
    })
}, [])

if(!users) {
  return <p> Loading users...</p>
}


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
            Hobbits:
            {users.map(user => {
                return <Link to={`/edit/${user.id}`}>
                  {<User name={user.name} bio={user.bio} data={users} key={user.id} id={user.id} />}</Link>
            })}
        </div>
        <Route exact path='/edit/:id' component={User.id} />
      </header>
    </div>
  );
}

export default App;
