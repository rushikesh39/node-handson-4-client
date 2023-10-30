import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";

function Register() {
  const navi = useNavigate();
  const [data, setData] = useState({
    userName: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    userName: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    // Clear the error for the corresponding input field
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    let formIsValid = true;

    // Validation logic
    // Username validation
    if (data.userName === "" || data.userName.length < 4) {
      setErrors({
        ...errors,
        userName: "Username is required or length must be 4 character",
      });
      formIsValid = false;
    }

    // Mobile validation
    if (data.mobile.length !== 10) {
      setErrors({ ...errors, mobile: "invalid mobile" });
      formIsValid = false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(data.email)) {
      setErrors({ ...errors, email: "Invalid Email Address" });
      formIsValid = false;
    }

    // Password validation
    if (data.password.length < 6) {
      setErrors({
        ...errors,
        password: "Password must be at least 6 characters",
      });
      formIsValid = false;
    }

    // If form is valid, proceed with registration
    if (formIsValid) {
      setData({
        userName: "",
        mobile: "",
        email: "",
        password: "",
      });

      try {
        setIsLoading(true);
        
        const response =await axios.post(
          "https://handon4.onrender.com/api/register",
          data
        );
        console.log(response.data.msg)
        alert(response.data.msg)
        localStorage.setItem("token",response.data.token)
        navi("/")
        
        setData({
          name: '',
          email: '',
          mobile: '',
          password: '',
        })


      } catch (error) {
        setIsLoading(false);
        alert("server connection problem");
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <Circles height="80" width="80" color="blue" ariaLabel="loading" />
        </div>
      ) : (
        ""
      )}
      <div className="signup">
        <form onSubmit={handleRegister} action="POST">
          <label htmlFor="chk" aria-hidden="true">
            Register
          </label>
          <input
            type="text"
            name="userName"
            placeholder="User name"
            onChange={handleChange}
            value={data.userName}
          />
          <div className="error">{errors.userName}</div>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            onChange={handleChange}
            value={data.mobile}
          />
          <div className="error">{errors.mobile}</div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />
          <div className="error">{errors.email}</div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />
          <div className="error">{errors.password}</div>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default Register;
