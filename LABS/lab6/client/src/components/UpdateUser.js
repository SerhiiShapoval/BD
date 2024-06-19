// src/components/UpdateUser.js
import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = () => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { username, email };
      const response = await axios.put(`http://localhost:5000/update-user/${userId}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json'
        }
      }); // Виконуємо PUT запит на сервер
      console.log('User updated:', response.data);
      // Очищаємо поля форми після успішного оновлення користувача
      setUserId('');
      setUsername('');
      setEmail('');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        <br />
        <label>New Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label>New Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
