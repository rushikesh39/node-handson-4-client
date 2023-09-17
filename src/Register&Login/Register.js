import React, { useState  } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

function Register() {  
  const navi=useNavigate()
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

  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   let formIsValid = true;

  //   

  //   if (formIsValid) {
      
  //     // Handle form submission logic here
  //     console.log("Form submitted with data:", data);

  //     try {
  //       await axios.post("http://localhost:5000/user/register",  data )
  //       .then(res=>{
  //         if(res.data.msg!=="registered"){
  //           alert("welcome")
  //             navi("/home",{state:{name:data.userName}})

  //             const handleLogout = () => {
  //               // Clear session data (example: clear localStorage)
  //               localStorage.removeItem('authToken'); // Clear the authentication token
            
  //               // Redirect to login page
  //               history.push('/login');
  //             };
  //         }
  //         else{
  //           alert("user already exist please login")
  //           setData({
  //             userNamename: "",
  //             mobile: "",
  //             email: "",
  //             password: "",
  //           });
  //         }
  //         console.log("Response",res.data)
  //       })
  //     } catch (e) {console.log(e)}

      
  //   }
    
  // }

  const handleRegister = async (e) => {
    e.preventDefault();
  
    let formIsValid = true;
  
    // Validation logic
    // Username validation
    if (data.userName === "" || data.userName.length <4) {
      setErrors({ ...errors, userName: "Username is required or length must be 4 character" });
      formIsValid = false;
    }

    // Mobile validation
    if ( data.mobile.length !== 10) {
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
      try {
        const response = await axios.post("https://node-handson4-f73q.onrender.com/user/register", data);
        console.log(response.data)
        if (response.data.msg !== "registered") {
          // Assuming the response includes a token, save it to localStorage for later use
          localStorage.setItem("authToken", response.data.token);
          
          // Decode the token to extract the expiration date
          const decodedToken = decodeToken(response.data.token);
  
          // Check if the token is expired
          if (isTokenExpired(decodedToken.exp)) {
            // If token is expired, redirect to login
            console.log("rawady")
            navi('/account');
          } else {
            // If token is valid, redirect to the dashboard route
          alert("Welcome!");

            navi("/dashboard", { state: { name: data.userName } });
          }
        } else {
          alert("User already exists. Please login.");
          setData({
            userName: "",
            mobile: "",
            email: "",
            password: "",
          });
        }
      } catch (error) {
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
    return exp < currentTime;
  };
  

  return (
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
        />
        <div className="error">{errors.userName}</div>
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
        />
        <div className="error">{errors.mobile}</div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <div className="error">{errors.email}</div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <div className="error">{errors.password}</div>
        <button type="submit" >Register</button>
      </form>
    </div>
  );
}

export default Register;
