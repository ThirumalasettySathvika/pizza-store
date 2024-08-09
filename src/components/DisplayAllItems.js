import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DisplayAllItems.css'; // Import the CSS file for custom styles

function DisplayAllItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>All Items</h2>
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className="item">
            {item.name} - ${item.price}
            <Link to={`/update/${item.id}`} className="btn btn-primary btn-sm mx-2">Update</Link>
            <Link to={`/delete/${item.id}`} className="btn btn-danger btn-sm mx-2">Delete</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayAllItems;