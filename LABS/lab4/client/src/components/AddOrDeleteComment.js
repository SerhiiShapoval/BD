import React, { useState } from 'react';
import axios from 'axios';
import Comments from './Comments'; // Імпортуємо компоненту для відображення коментарів

function AddOrDeleteComment() {
  const [text, setText] = useState('');
  const [userId, setUserId] = useState(''); // Assuming userId is selected or fetched from somewhere
  const [adId, setAdId] = useState(''); // Assuming adId is selected or fetched from somewhere
  const [commentId, setCommentId] = useState(''); // For delete mode
  const [mode, setMode] = useState('add'); // 'add' or 'delete'

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mode === 'add') {
      const comment = { text, userId, adId };

      axios.post('http://localhost:5000/comments', comment, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('Comment added!', response.data);
        })
        .catch(error => {
          console.error('There was an error adding the comment!', error);
        });
    } else if (mode === 'delete') {
      axios.delete(`http://localhost:5000/comments/${commentId}`)
        .then(response => {
          console.log('Comment deleted!', response.data);
        })
        .catch(error => {
          console.error('There was an error deleting the comment!', error);
        });
    }
  };

  return (
    <div>
      <Comments /> {/* Виводимо компоненту для відображення коментарів */}
      <h1>{mode === 'add' ? 'Add Comment' : 'Delete Comment'}</h1>
      <form onSubmit={handleSubmit}>
        {mode === 'add' && (
          <div>
            <label>
              Text:
              <textarea value={text} onChange={(e) => setText(e.target.value)} />
            </label>
            <label>
              User ID:
              <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
            </label>
            <label>
              Ad ID:
              <input type="text" value={adId} onChange={(e) => setAdId(e.target.value)} />
            </label>
          </div>
        )}
        {mode === 'delete' && (
          <div>
            <label>
              Comment ID:
              <input type="text" value={commentId} onChange={(e) => setCommentId(e.target.value)} />
            </label>
          </div>
        )}
        <button type="submit">{mode === 'add' ? 'Add Comment' : 'Delete Comment'}</button>
      </form>
      <button onClick={() => setMode(mode === 'add' ? 'delete' : 'add')}>
        Switch to {mode === 'add' ? 'Delete Mode' : 'Add Mode'}
      </button>
    </div>
  );
}

export default AddOrDeleteComment;