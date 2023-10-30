import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token)

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:5000/api", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
    }
    else{
        navigate("/login")
    }
  },[token,navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      Home
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
