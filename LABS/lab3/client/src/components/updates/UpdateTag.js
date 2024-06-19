import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const UpdateTag = () => {
  const [name, setName] = useState('');
  const { id }  = useParams()
  useEffect(() => {
    // Отримуємо поточні дані тега для відображення у формі
    fetchTagData(id);
  }, [id]);

  const fetchTagData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/tags/${id}`);
      const tagData = response.data;

      setName(tagData.name);
    } catch (error) {
      console.error('Error fetching tag data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedTag = { name };

    try {
      const response = await axios.put(`http://localhost:5000/tags/${id}`, updatedTag);
      console.log('Tag updated!', response.data);
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  return (
    <div>
      <h2>Update Tag</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">Update Tag</button>
      </form>
    </div>
  );
};

export default UpdateTag;
