import React, { useState } from 'react';
import axios from 'axios';
import Ads from './Ads'; // Імпортуємо компоненту для відображення оголошень

function AddOrDeleteAdd() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [userId, setUserId] = useState(''); // Assuming userId is selected or fetched from somewhere
  const [categoryId, setCategoryId] = useState(''); // Assuming categoryId is selected or fetched from somewhere
  const [adId, setAdId] = useState(''); // For delete mode
  const [mode, setMode] = useState('add'); // 'add' or 'delete'

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mode === 'add') {
      const ad = { title, description, price, userId, categoryId };

      axios.post('http://localhost:5000/ads', ad, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('Ad added!', response.data);
        })
        .catch(error => {
          console.error('There was an error adding the ad!', error);
        });
    } else if (mode === 'delete') {
      axios.delete(`http://localhost:5000/ads/${adId}`)
        .then(response => {
          console.log('Ad deleted!', response.data);
        })
        .catch(error => {
          console.error('There was an error deleting the ad!', error);
        });
    }
  };

  return (
    <div>
      <Ads /> {/* Виводимо компоненту для відображення оголошень */}
      <h1>{mode === 'add' ? 'Add Ad' : 'Delete Ad'}</h1>
      <form onSubmit={handleSubmit}>
        {mode === 'add' && (
          <div>
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
          </div>
        )}
        {mode === 'delete' && (
          <div>
            <label>
              Ad ID:
              <input type="text" value={adId} onChange={(e) => setAdId(e.target.value)} />
            </label>
          </div>
        )}
        <button type="submit">{mode === 'add' ? 'Add Ad' : 'Delete Ad'}</button>
      </form>
      <button onClick={() => setMode(mode === 'add' ? 'delete' : 'add')}>
        Switch to {mode === 'add' ? 'Delete Mode' : 'Add Mode'}
      </button>
    </div>
  );
}

export default AddOrDeleteAdd;
