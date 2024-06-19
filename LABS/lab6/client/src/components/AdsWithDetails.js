// src/components/AdsWithDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdsWithDetails = () => {
  const [adsWithDetails, setAdsWithDetails] = useState([]);

  useEffect(() => {
    const fetchAdsWithDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ads-with-details'); // adjust URL as per your server route
        setAdsWithDetails(response.data);
      } catch (error) {
        console.error('Error fetching ads with details:', error);
      }
    };

    fetchAdsWithDetails();
  }, []);

  return (
    <div>
      <h2>Ads with Details</h2>
      <ul>
        {adsWithDetails.map(ad => (
          <li key={ad._id}>
            <strong>Title:</strong> {ad.title} <br />
            <strong>Description:</strong> {ad.description} <br />
            <strong>Price:</strong> ${ad.price} <br />
            <strong>Category:</strong> {ad.categoryInfo.name} <br />
            <strong>User:</strong> {ad.userInfo.username} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdsWithDetails;
