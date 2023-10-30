import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("token", token);

  const [userName, setUserName]=useState('')
  useEffect(() => {
    // Check if the token is available
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const username = decodedToken.email;
       

        const expirationTime = decodedToken.exp;
        const currentTime = Math.floor(Date.now() / 1000);

        if (expirationTime > currentTime) {
          setUserName(username)
          console.log("username",userName)
          console.log("Token is valid");
          axios.get("https://handon4.onrender.com/api", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          alert("Session expired");
          // localStorage.removeItem("token");
          navigate("/login");
          console.log("Token has expired");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
      console.log("Token is missing");
    }
  }, [token, navigate,userName]);

  

  return (
    <div>
     <h2> Welcome {userName}</h2>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
}

export default Home;
