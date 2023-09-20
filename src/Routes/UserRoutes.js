import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../Nav/NavBar";
import Home from "./Home/Home";
import RegisterLogin from "../Register&Login";
// import Dashboard from "./Dashboard/Dashboard";
// import Products from './Products';
// import Cart from './Cart';

const Dashboard=lazy(()=>import("./Dashboard/Dashboard"))

function UserRoutes() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
           <Route path="/" element={<Home />} />

          <Route path="/login" element={<RegisterLogin />} /> 
          <Route path="/dashboard" element={<Suspense fallback={<div>Loading</div>}>
            <Dashboard/>
          </Suspense>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default UserRoutes;
