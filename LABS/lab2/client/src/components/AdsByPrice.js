import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdsByPrice({ minPrice }) {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/ads-by-price?minPrice=${minPrice}`)
      .then(response => {
        setAds(response.data);
      })
      .catch(error => {
        console.error('Error fetching ads by price:', error);
      });
  }, [minPrice]);

  return (
    <div>
      <h1>Ads by Price (minPrice: {minPrice})</h1>
      <ul>
        {ads.map(ad => (
          <li key={ad.title}>
            <strong>Title:</strong> {ad.title}<br />
            <strong>Description:</strong> {ad.description}<br />
            <strong>Price:</strong> ${ad.price}<br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdsByPrice;
