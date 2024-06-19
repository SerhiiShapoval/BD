import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const UpdateCategory = () => {
  const [name, setName] = useState('');
  const { id }  = useParams()

  useEffect(() => {
    // Отримуємо поточні дані категорії для відображення у формі
    fetchCategoryData(id);
  }, [id]);

  const fetchCategoryData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/categories/${id}`);
      const categoryData = response.data;

      setName(categoryData.name);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedCategory = { name };

    try {
      const response = await axios.put(`http://localhost:5000/categories/${id}`, updatedCategory);
      console.log('Category updated!', response.data);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div>
      <h2>Update Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">Update Category</button>
      </form>
    </div>
  );
};

export default UpdateCategory;
