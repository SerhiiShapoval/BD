import React, { useState } from 'react';
import axios from 'axios';
import Categories from './Categories'; // Імпортуємо компоненту для відображення категорій

function AddOrDeleteCategory() {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [mode, setMode] = useState('add'); // 'add' or 'delete'

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mode === 'add') {
      const category = { name };

      axios.post('http://localhost:5000/categories', category, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('Category added!', response.data);
        })
        .catch(error => {
          console.error('There was an error adding the category!', error);
        });
    } else if (mode === 'delete') {
      axios.delete(`http://localhost:5000/categories/${categoryId}`)
        .then(response => {
          console.log('Category deleted!', response.data);
        })
        .catch(error => {
          console.error('There was an error deleting the category!', error);
        });
    }
  };

  return (
    <div>
      <Categories /> {/* Виводимо компоненту для відображення категорій */}
      <h1>{mode === 'add' ? 'Add Category' : 'Delete Category'}</h1>
      <form onSubmit={handleSubmit}>
        {mode === 'add' && (
          <div>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
          </div>
        )}
        {mode === 'delete' && (
          <div>
            <label>
              Category ID:
              <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
            </label>
          </div>
        )}
        <button type="submit">{mode === 'add' ? 'Add Category' : 'Delete Category'}</button>
      </form>
      <button onClick={() => setMode(mode === 'add' ? 'delete' : 'add')}>
        Switch to {mode === 'add' ? 'Delete Mode' : 'Add Mode'}
      </button>
    </div>
  );
}

export default AddOrDeleteCategory;
