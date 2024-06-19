import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/comments')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  return (
    <div>
      <h1>Comments</h1>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}><Link to={`update-comment/${comment.id}`}>{comment.content}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
