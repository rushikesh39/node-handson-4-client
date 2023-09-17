import React,{useState} from "react";
import axios from "axios";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleClick = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
       await axios.post("https://node-handson4-f73q.onrender.com/",data);
      setData({
        email: "",
        password: "",
      });
    
    } catch (e) {
      console.log(e);
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
