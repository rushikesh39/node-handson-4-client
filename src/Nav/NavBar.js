import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 


function NavBar() {
  return (
    <>
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <ul className="navbar-nav">
          {/* <li className="nav-item">
            <Link to="/products" className="nav-link">
              Products
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link to="/cart" className="nav-link">
              Cart
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
             
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Register/Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
}

export default NavBar;
