import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; 


function NavBar() {
  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
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
            <Link to="/login" className="nav-link">
             Login
            </Link>
          </li>
          
          <li className="nav-item">
            <Link onClick={handleLogout} className="nav-link">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
}

export default NavBar;
