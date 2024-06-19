import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OrdersList() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ads');
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div>
      <h2>Ads List</h2>
      <ul>
        {ads.map(ad => (
          <li key={ad.id}>
            <Link to={`/order/${ad.id}`}>
              {ad.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersList;
