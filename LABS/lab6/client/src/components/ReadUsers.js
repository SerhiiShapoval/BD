// src/components/ReadUsers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReadUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users', {
          headers: {
            'Content-Type': 'application/json'
          }
        }); // Виконуємо GET запит на сервер
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <strong>User ID: {user._id}</strong> <br/>
            <strong>Username:</strong> {user.username} <br />
            <strong>Email:</strong> {user.email} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadUsers;
