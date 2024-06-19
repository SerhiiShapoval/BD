import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Ads({ needRefresh = null, setNeedRefresh = () => {} }) {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    if (needRefresh !== false) {
      axios.get('http://localhost:5000/ads')
        .then(response => {
          setAds(response.data);
        })
        .catch(error => {
          console.error('Error fetching ads:', error);
        });
      setNeedRefresh(false)
    }
  }, [needRefresh]);

  return (
    <div>
      <h1>Ads</h1>
      <ul>
        {ads.map(ad => (
          <li key={ad.id}><Link to={`update-ad/${ad.id}`}>User Id: {ad.userId} {ad.title} - {ad.description} - ${ad.price}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default Ads;