import React, { useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navi=useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  const [Data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleClick = (event) => {
    setData({ ...Data, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event) {
    let formIsValid = true;

    event.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(Data.email)) {
      setErrors({ ...errors, email: "Invalid Email Address" });
      formIsValid = false;
    }
    if (Data.userName === "") {
      setErrors({
        ...errors,
        userName: "Password is required ",
      });
      formIsValid = false;
    }
    if (formIsValid) {
      setData({
        email: "",
        password: "",
      });
      try {
        setIsLoading(true);
        localStorage.clear();
        const response = await axios.post(
          "https://handon4.onrender.com/api/login",
          Data
        );
        console.log(response);
        alert(response.data.msg);
        setIsLoading(false);
        localStorage.setItem("token", response.data.token);
        navi("/");

        // .then((res)=>{console.log(res.data);
        // localStorage.setItem('token', res.data.token)})
        // .catch((err) => console.log(err))
        // console.log(localStorage.getItem('token'))

        // if(response.data.msg==='success'){
        //   localStorage.setItem("token", response.data.token);
        //   navi("/");
        // }
        // if(response.data.msg==='password_wrong'){
        //   alert("password is wrong")
        // }
        // if(response.data.msg==='not_registerd'){
        //   alert("you dont have account please login")
        // }
      } catch (e) {
        setIsLoading(false);
        alert("server connection problem");
        console.error("Error during registration:", e);
      }
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <Circles height="80" width="80" color="blue" ariaLabel="loading" />
        </div>
      ) : (
        ""
      )}
      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required=""
            onChange={handleClick}
            value={Data.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleClick}
            value={Data.password}
          />
          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
