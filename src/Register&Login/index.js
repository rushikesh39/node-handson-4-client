import React from "react";
import Register from "./Register";
import Login from "./Login";
import "./style.css"

function RegisterLogin() {
  return (
    <div className="BigContainer">
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />
      <Register/>
      <Login/>
    </div>
    </div>
    
  );
}

export default RegisterLogin;
