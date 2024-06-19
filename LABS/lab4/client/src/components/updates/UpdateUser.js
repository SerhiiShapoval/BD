import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateUser = ({ userId }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { id }  = useParams()

  useEffect(() => {
    // Отримуємо поточні дані користувача для відображення у формі
    fetchUserData(id);
  }, [id]);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      const userData = response.data;

      setUsername(userData.username);
      setEmail(userData.email);
      setPassword(userData.password); // Це може бути небезпечно, розгляньте застосування token.
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedUser = { username, email, password };

    try {
      const response = await axios.put(`http://localhost:5000/users/${id}`, updatedUser);
      console.log('User updated!', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
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
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
