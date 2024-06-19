import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const UpdateAd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [userId, setUserId] = useState(''); // Assuming userId is selected or fetched from somewhere
  const [categoryId, setCategoryId] = useState(''); // Assuming categoryId is selected or fetched from somewhere
  const { id }  = useParams()
  useEffect(() => {
    // Отримуємо поточні дані оголошення для відображення у формі
    fetchAdData(id);
  }, [id]);

  const fetchAdData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/ads/${id}`);
      const adData = response.data;

      setTitle(adData.title);
      setDescription(adData.description);
      setPrice(adData.price);
      setUserId(adData.userId); // Це може бути небезпечно, розгляньте застосування token.
      setCategoryId(adData.categoryId); // Це може бути небезпечно, розгляньте застосування token.
    } catch (error) {
      console.error('Error fetching ad data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedAd = { title, description, price, userId, categoryId };

    try {
      const response = await axios.put(`http://localhost:5000/ads/${id}`, updatedAd);
      console.log('Ad updated!', response.data);
    } catch (error) {
      console.error('Error updating ad:', error);
    }
  };

  return (
    <div>
      <h2>Update Ad</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <label>
          Category ID:
          <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
        </label>
        <button type="submit">Update Ad</button>
      </form>
    </div>
  );
};

export default UpdateAd;
