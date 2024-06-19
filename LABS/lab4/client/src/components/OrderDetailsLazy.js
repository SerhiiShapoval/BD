import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OrderDetails() {
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await axios.get(`http://localhost:5000/ads/${id}`);
        const orderData = orderResponse.data;
        setOrder(orderData);
        setIsLoading(false);

        // Додатковий запит для отримання даних про автора оголошення (User)
        const userResponse = await axios.get(`http://localhost:5000/users/${orderData.userId}`);
        const userData = userResponse.data;
        setOrder(prevOrder => ({ ...prevOrder, user: userData }));

        const commentsResponse = await axios.get(`http://localhost:5000/ads/${orderData.id}/comments`);
        const commentsData = commentsResponse.data;
        setOrder(prevOrder => ({ ...prevOrder, Comments: commentsData }));
        // Додатковий запит для отримання даних про категорію оголошення (Category)
        const categoryResponse = await axios.get(`http://localhost:5000/categories/${orderData.categoryId}`);
        const categoryData = categoryResponse.data;
        setOrder(prevOrder => ({ ...prevOrder, category: categoryData }));

        // Отримання тегів для цього оголошення
        const tagsResponse = await axios.get(`http://localhost:5000/ads/${orderData.id}/tags`);
        const tagsData = tagsResponse.data;
        setOrder(prevOrder => ({ ...prevOrder, Tags: tagsData }));
      } catch (error) {
        console.error('Error fetching order details:', error);
        setIsLoading(false); // Встановлення isLoading в false в разі помилки
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      <p><strong>User:</strong> {order.user ? order.user.username : 'Loading...'}</p>
      <p><strong>Ad Title:</strong> {order ? order.title : 'Loading...'}</p>
      <p><strong>Ad Description:</strong> {order ? order.description : 'Loading...'}</p>
      <p><strong>Category:</strong> {order.category ? order.category.name : 'Loading...'}</p>

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

export default OrderDetails;
