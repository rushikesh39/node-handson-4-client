import React, { useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";


const Login = () => {
 
    const [Data, setData] = useState(
        {
            email: "",
            password: ""
        }
    )
    const [errors, setErrors] = useState({
      email: "",
      password: "",
    });

    const handleClick = (event) => {
        setData({ ...Data, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {
      let formIsValid = true;

        event.preventDefault()

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(Data.email)) {
          setErrors({ ...errors, email: "Invalid Email Address" });
          formIsValid = false;
        }
        if (Data.userName === "" ) {
          setErrors({
            ...errors,
            userName: "Password is required ",
          });
          formIsValid = false;
        }
        if(formIsValid)
        {
          setData({
            email: "",
            password: "",
          });
          try{
            localStorage.clear()
            const response=await axios.post('https://node-handson4-f73q.onrender.com/user/login', Data)
              .then((res)=>{console.log(res.data);
              localStorage.setItem('token', res.data.token)})
              .catch((err) => console.log(err))
              console.log(localStorage.getItem('token'))

              if(response.data.msg==='success'){
                alert("welcome")
              }
              if(response.data.msg==='password_wrong'){
                alert("password is wrong")
              }
              if(response.data.msg==='not_registerd'){
                alert("you dont have account please login")
              }


          }
          catch(e){

          }
        }
        

        
       

    }

  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input type="email" name="email" placeholder="Email"required="" onChange={handleClick} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleClick}

          />
          <button>Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
