import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const handleInputChange = (e) => {
    
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const response =await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
      console.log(response.data.msg)
      alert(response.data.msg)
      localStorage.setItem("token",response.data.token)
      navigate("/")
      
      setFormData({
        name: '',
        email: '',
        mobile: '',
        password: '',
      })
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

