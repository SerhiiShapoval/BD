import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Tags() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tags')
      .then(response => {
        setTags(response.data);
      })
      .catch(error => {
        console.error('Error fetching tags:', error);
      });
  }, []);

  return (
    <div>
      <h1>Tags</h1>
      <ul>
        {tags.map(tag => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tags;
