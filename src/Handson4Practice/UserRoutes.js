import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Nav from './Nav'

function UserRoutes() {
  return (
    <div>
       
        <BrowserRouter>
        <Nav/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default UserRoutes
