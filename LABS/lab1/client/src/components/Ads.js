import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Ads() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/ads')
      .then(response => {
        setAds(response.data);
      })
      .catch(error => {
        console.error('Error fetching ads:', error);
      });
  }, []);

  return (
    <div>
      <h1>Ads</h1>
      <ul>
        {ads.map(ad => (
          <li key={ad.id}>{ad.title} - {ad.description} - ${ad.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default Ads;