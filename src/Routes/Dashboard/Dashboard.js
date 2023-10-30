// import React, { useEffect } from 'react';
// import jwt_decode from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

// function Dashboard() {
//   const navi = useNavigate();

//   const decodeToken = (token) => {
//     const decodedToken = jwt_decode(token);
//     return decodedToken;
//   };

//   const isTokenExpired = (exp) => {
//     const currentTime = Date.now() / 1000; // Convert to seconds
//     console.log("Current time:", currentTime);
//     console.log("Token expiration time:", exp);
//     return exp < currentTime;
//   };

//   const checkTokenExpiration = () => {
//     const authToken = localStorage.getItem('authToken');
//     console.log("auth token", authToken);
//     if (authToken) {
//       const decodedToken = decodeToken(authToken);
//       if (isTokenExpired(decodedToken.exp)) {
//         localStorage.removeItem("authToken");
//         alert("Session has expired. Please login again.");
//         navi("/login");
//       }
//     }
//     else{
//       alert("session expire")
//       navi("/login");
//     }
//   };
//   useEffect(() => {
//     checkTokenExpiration();
//   }, []); // Empty dependency array ensures it runs only once on mount

  
//   return (
//     <div>
//       Welcome to Dashboard
//     </div>
//   );
// }

// export default Dashboard;
