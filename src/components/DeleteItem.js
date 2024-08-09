import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DeleteItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.delete(`http://localhost:5000/items/${id}`)
      .then(() => {
        console.log('Item deleted');
        navigate('/items');
      })
      .catch(error => console.error('Error deleting item:', error));
  }, [id, navigate]);

  return (
    <div>
      <h2>Deleting Item...</h2>
    </div>
  );
}

export default DeleteItem;