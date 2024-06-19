// src/components/UsersWithStats.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersWithStats = () => {
  const [usersWithStats, setUsersWithStats] = useState([]);

  useEffect(() => {
    const fetchUsersWithStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users-with-stats'); // adjust URL as per your server route
        setUsersWithStats(response.data);
      } catch (error) {
        console.error('Error fetching users with stats:', error);
      }
    };

    fetchUsersWithStats();
  }, []);

  return (
    <div>
      <h2>Users with Stats</h2>
      <ul>
        {usersWithStats.map(user => (
          <li key={user._id}>
            <strong>Username:</strong> {user.username} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Ads Count:</strong> {user.adsCount} <br />
            <strong>Comments Count:</strong> {user.commentsCount} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersWithStats;
