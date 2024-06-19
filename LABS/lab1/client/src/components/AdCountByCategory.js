import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdCountByCategory() {
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/ad-count-by-category')
      .then(response => {
        setCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching ad counts by category:', error);
      });
  }, []);

  return (
    <div>
      <h1>Ad Counts by Category</h1>
      <ul>
        {counts.map(count => (
          <li key={count.name}>
            <strong>Category:</strong> {count.name}<br />
            <strong>Ad Count:</strong> {count.adCount}<br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdCountByCategory;
