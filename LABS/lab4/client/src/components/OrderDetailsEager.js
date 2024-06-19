import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OrderDetailsEager() {
  const [order, setOrder] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await axios.get(`http://localhost:5000/order-eager/${id}?include=user,comments,tags`);
        const orderData = orderResponse.data;
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (!order || !order.User) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      <p><strong>User:</strong> {order.User.username}</p>
      <p><strong>Ad Title:</strong> {order.title}</p>
      <p><strong>Ad Description:</strong> {order.description}</p>
      
      <h3>Comments:</h3>
      <ul>
        {order.Comments?.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>

      <h3>Tags:</h3>
      <ul>
        {order.Tags?.map(tag => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetailsEager;
