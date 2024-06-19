import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const UpdateComment = () => {
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(''); // Assuming userId is selected or fetched from somewhere
  const [adId, setAdId] = useState(''); // Assuming adId is selected or fetched from somewhere
  const { id }  = useParams()
  useEffect(() => {
    // Отримуємо поточні дані коментаря для відображення у формі
    fetchCommentData(id);
  }, [id]);

  const fetchCommentData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/comments/${id}`);
      const commentData = response.data;

      setContent(commentData.content);
      setUserId(commentData.userId); // Це може бути небезпечно, розгляньте застосування token.
      setAdId(commentData.adId); // Це може бути небезпечно, розгляньте застосування token.
    } catch (error) {
      console.error('Error fetching comment data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedComment = { content, userId, adId };

    try {
      const response = await axios.put(`http://localhost:5000/comments/${id}`, updatedComment);
      console.log('Comment updated!', response.data);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <div>
      <h2>Update Comment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <label>
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <label>
          Ad ID:
          <input type="text" value={adId} onChange={(e) => setAdId(e.target.value)} />
        </label>
        <button type="submit">Update Comment</button>
      </form>
    </div>
  );
};

export default UpdateComment;
