
import './App.css';
import UserRoutes from './Routes/UserRoutes';

function App() {
  return (
    <div className="App">
    
   <UserRoutes/>
      

    </div>
  );
}

export default App;

// import React, { Component } from 'react'
// import { io } from 'socket.io-client'
// export default class App extends Component {
//   constructor(){
//     super()
//     this.socket=io("http://localhost:5000/");
//     this.socket.on("MESSAGE",(data)=>{
//       console.log(data)
//     })
//     this.socket.on("sendBroadcastmsg",(data)=>{
//       console.log(data)
//     })
//   }
//   handleMsg=()=>{
//     this.socket.emit("MESSAGE","client is sending")
//   }
//   handlebroadcast=()=>{
//     this.socket.emit("BROADCAST" ,'broadcast everyon')
//   }
//   render() {
//     return (
//       <div>
//         socket client side
//         <button onClick={this.handleMsg}>send msg</button>
//         <button onClick={this.handlebroadcast}>handle broadcast</button>
//       </div>
//     )
//   }
// }
