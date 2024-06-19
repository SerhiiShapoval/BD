import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Users({ needRefresh = null, setNeedRefresh = () => {} }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (needRefresh !== false) {
      axios.get('http://localhost:5000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
      setNeedRefresh(false)
    }
  }, [needRefresh]);
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}><Link to={`update-user/${user.id}`}>{user.id}. {user.username} - {user.email}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
