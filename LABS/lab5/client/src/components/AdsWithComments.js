// src/components/AdsWithComments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdsWithComments = () => {
  const [adsWithComments, setAdsWithComments] = useState([]);

  useEffect(() => {
    const fetchAdsWithComments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ads-with-comments-count'); // adjust URL as per your server route
        setAdsWithComments(response.data);
      } catch (error) {
        console.error('Error fetching ads with comments:', error);
      }
    };

    fetchAdsWithComments();
  }, []);

  return (
    <div>
      <h2>Ads with Comments</h2>
      <ul>
        {adsWithComments.map(ad => (
          <li key={ad._id}>
            <strong>Title:</strong> {ad.title} <br />
            <strong>Description:</strong> {ad.description} <br />
            <strong>Price:</strong> ${ad.price} <br />
            <strong>Comments Count:</strong> {ad.commentsCount} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdsWithComments;
