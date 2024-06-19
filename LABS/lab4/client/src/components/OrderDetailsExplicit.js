import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OrderDetailsExplicit () {
  const [order, setOrder] = useState({});
  const [comments, setComments] = useState([]);
  const [tags, setTags] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await axios.get(`http://localhost:5000/ads/${id}`);
        const orderData = orderResponse.data;
        setOrder(orderData);

        // Explicit loading of comments
        const commentsResponse = await axios.get(`http://localhost:5000/orders/${id}/comments`);
        const commentsData = commentsResponse.data;
        setComments(commentsData);

        // Explicit loading of tags
        const tagsResponse = await axios.get(`http://localhost:5000/orders/${id}/tags`);
        const tagsData = tagsResponse.data;
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (!order || !order.user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      <p><strong>User:</strong> {order.user.username}</p>
      <p><strong>Ad Title:</strong> {order.title}</p>
      <p><strong>Ad Description:</strong> {order.description}</p>
      
      <h3>Comments:</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>

      <h3>Tags:</h3>
      <ul>
        {tags.map(tag => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetailsExplicit;
