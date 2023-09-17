import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../Nav/NavBar";
import Home from "./Home/Home";
import RegisterLogin from "../Register&Login";
// import Products from './Products';
// import Cart from './Cart';

function UserRoutes() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
           <Route path="/" element={<Home />} />

          <Route path="/account" element={<RegisterLogin />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default UserRoutes;
