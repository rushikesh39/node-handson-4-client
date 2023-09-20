import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
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
        const response = await axios.post(
          "https://node-handson4-f73q.onrender.com/user/register",
          data
        );
        console.log(response.data);
        if (response.data.msg !== "registered") {
          // setIsLoading(false)

          // Assuming the response includes a token, save it to localStorage for later use
          localStorage.setItem("authToken", response.data.token);

          // Decode the token to extract the expiration date
          const decodedToken = decodeToken(response.data.token);
          console.log(decodedToken);

          
          // Function to check if the token is expired and update UI accordingly
          const checkTokenExpiration = () => {
            const authToken = localStorage.getItem("authToken");
            if (authToken) {
              const decodedToken = decodeToken(authToken);
              if (isTokenExpired(decodedToken.exp)) {
                localStorage.removeItem("authToken");
                alert("Session has expired. Please login again.");
                navi("/login");
              }
            }
          };

          // Call the checkTokenExpiration function every second
          setInterval(checkTokenExpiration, 1000);

          // Clear the interval if needed (e.g., when navigating away from the page)
          // clearInterval(tokenCheckInterval);

          if (isTokenExpired(decodedToken.exp)) {
            // If token is expired, redirect to login
            localStorage.removeItem("authToken");
            alert("session expire please login again");
            navi("/login");
          } else {
            // If token is valid, redirect to the dashboard route

            setIsLoading(false);
            navi("/dashboard", { state: { name: data.userName } });
          }
        } else {
          setIsLoading(false);
          alert("User already exists. Please login.");
        }
      } catch (error) {
        setIsLoading(false);
        alert("server connection problem");
        console.error("Error during registration:", error);
      }
    }
  };

  const decodeToken = (token) => {
    // Decode the token (assuming it's a JWT)
    const decodedToken = jwt_decode(token);
    return decodedToken;
  };

  const isTokenExpired = (exp) => {
    const currentTime = Date.now() / 1000; // Convert to seconds
    console.log("Current time:", currentTime);
    console.log("Token expiration time:", exp);
    return exp < currentTime;
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
