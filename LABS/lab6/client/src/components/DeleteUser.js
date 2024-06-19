// src/components/DeleteUser.js
import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = () => {
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:5000/delete-user/${userId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }); // Виконуємо DELETE запит на сервер
      console.log('User deleted:', response.data);
      // Очищаємо поле форми після успішного видалення користувача
      setUserId('');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        <br />
        <button type="submit">Delete User</button>
      </form>
    </div>
  );
};

export default DeleteUser;
