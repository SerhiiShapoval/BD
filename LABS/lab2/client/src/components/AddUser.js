import React, { useState } from 'react';
import axios from 'axios';

function AddUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { username, email, password };
    
    axios.post('http://localhost:5000/users', user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('User added!', response.data);
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
