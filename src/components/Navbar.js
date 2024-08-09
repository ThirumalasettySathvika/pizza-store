import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for custom styles

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light flex-column">
      <div className="navbar-brand mx-auto">Pizza Store</div>
      <div className="collapse navbar-collapse justify-content-center">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/items">Display All Items</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add">Add New Item</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;