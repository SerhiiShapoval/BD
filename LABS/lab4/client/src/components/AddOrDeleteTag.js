import React, { useState } from 'react';
import axios from 'axios';
import Tags from './Tags';

function AddOrDeleteTag() {
  const [name, setName] = useState('');
  const [tagId, setTagId] = useState(''); // For delete mode
  const [mode, setMode] = useState('add'); // 'add' or 'delete'

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mode === 'add') {
      const tag = { name };

      axios.post('http://localhost:5000/tags', tag, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('Tag added!', response.data);
        })
        .catch(error => {
          console.error('There was an error adding the tag!', error);
        });
    } else if (mode === 'delete') {
      axios.delete(`http://localhost:5000/tags/${tagId}`)
        .then(response => {
          console.log('Tag deleted!', response.data);
        })
        .catch(error => {
          console.error('There was an error deleting the tag!', error);
        });
    }
  };

  return (
    <div>
      <Tags />
      <h1>{mode === 'add' ? 'Add Tag' : 'Delete Tag'}</h1>
      <form onSubmit={handleSubmit}>
        {mode === 'add' && (
          <div>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
          </div>
        )}
        {mode === 'delete' && (
          <div>
            <label>
              Tag ID:
              <input type="text" value={tagId} onChange={(e) => setTagId(e.target.value)} />
            </label>
          </div>
        )}
        <button type="submit">{mode === 'add' ? 'Add Tag' : 'Delete Tag'}</button>
      </form>
      <button onClick={() => setMode(mode === 'add' ? 'delete' : 'add')}>
        Switch to {mode === 'add' ? 'Delete Mode' : 'Add Mode'}
      </button>
    </div>
  );
}

export default AddOrDeleteTag;