import React, { useState } from 'react';
import axios from 'axios';
import Users from './Users';
import Ads from './Ads';

function DeleteUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [mode, setMode] = useState('add'); // 'add' or 'delete'
  const [needRefresh, setNeedRefresh] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mode === 'add') {
      const user = { username, email, password };

      axios.post('http://localhost:5000/users', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('User added!', response.data);
          setNeedRefresh(true)
        })
        .catch(error => {
          console.error('There was an error adding the user!', error);
        });
    } else if (mode === 'delete') {
      axios.delete(`http://localhost:5000/users/${userId}`)
        .then(response => {
          console.log('User deleted!', response.data);
          setNeedRefresh(true)
        })
        .catch(error => {
          console.error('There was an error deleting the user!', error);
        });
    }
  };

  return (
    <div>
      <Users needRefresh={needRefresh} setNeedRefresh={setNeedRefresh}/>
      <Ads needRefresh={needRefresh} setNeedRefresh={setNeedRefresh}/>
      <h1>{mode === 'add' ? 'Add User' : 'Delete User'}</h1>
      <form onSubmit={handleSubmit}>
        {mode === 'add' && (
          <div>
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
          </div>
        )}
        {mode === 'delete' && (
          <div>
            <label>
              User ID:
              <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
            </label>
          </div>
        )}
        <button type="submit">{mode === 'add' ? 'Add User' : 'Delete User'}</button>
      </form>
      <button onClick={() => setMode(mode === 'add' ? 'delete' : 'add')}>
        Switch to {mode === 'add' ? 'Delete Mode' : 'Add Mode'}
      </button>
    </div>
  );
}

export default DeleteUser;
