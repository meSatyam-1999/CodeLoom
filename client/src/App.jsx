import io from "socket.io-client"
import './App.css'
import { useState } from "react";

const socket = io("http://localhost:7777");

function App() {

  const [joined,setJoined] = useState(true);

  if(!joined){
    return (
      <div>
        <h1>User is not joined in the Room.</h1>
      </div>
    )
  }

  return (
    <div>
      <h1>User is joined the room successfully.</h1>
    </div>
  )
}

export default App
