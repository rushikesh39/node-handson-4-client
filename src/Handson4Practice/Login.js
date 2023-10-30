import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/login",
      formData
    );
    console.log(response.data);
    if (response.data.msg !== "user Not exist") {
      if (response.data.msg === "Success") {
        alert("Welcome");
      } else {
        alert("password is wrong");
      }
    } else {
        alert("You dont have account")
    }
    setFormData({
        email: "",
        password: "",
      })
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
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

export default Login;
