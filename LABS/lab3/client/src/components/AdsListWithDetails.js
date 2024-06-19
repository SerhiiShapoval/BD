import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdsListWithDetails() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/ads-with-details')
      .then(response => {
        setAds(response.data);
      })
      .catch(error => {
        console.error('Error fetching ads with details:', error);
      });
  }, []);

  return (
    <div>
      <h1>Ads with Details</h1>
      <ul>
        {ads.map(ad => (
          <li key={ad.title}>
            <strong>Title:</strong> {ad.title}<br />
            <strong>Description:</strong> {ad.description}<br />
            <strong>Price:</strong> ${ad.price}<br />
            <strong>User:</strong> {ad.username}<br />
            <strong>Category:</strong> {ad.category}<br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdsListWithDetails;
