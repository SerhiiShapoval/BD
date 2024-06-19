import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
          <li key={tag.id}><Link to={`update-tag/${tag.id}`}>{tag.name}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default Tags;
