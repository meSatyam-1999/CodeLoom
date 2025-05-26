import io from "socket.io-client"
import './App.css'
import { useState } from "react";

const socket = io("http://localhost:7777");

function App() {

  const [joined,setJoined] = useState(false);
  const [roomId,setRoomId] = useState("");
  const [userName,setUserName] = useState("");

  //join button fuction for joining room
  const joinRoom = () => {
    if(roomId && userName){
      socket.emit("join",{roomId,userName});
      setJoined(true);
    }
  }

  if(!joined){
    return (
      <div className="join-container bg-black w-full h-screen">
        <div className="join-form flex flex-col justify-center items-center">
          
          
          <h1 className="text-5xl font-bold mt-15 text-amber-500 font-serif">Join Code Room</h1>
          
          <div className="form-border border mt-15 px-8 py-18 rounded-lg border-white">
          <div>
          <h3 className="text-md font-semibold text-white">Room Id</h3>
          <input value={roomId} onChange={(e)=>setRoomId(e.target.value)} className="w-80 border py-2 mt-2 px-3 rounded-lg bg-white" type="text" placeholder="*roomid" />
          </div>

          <div>
          <h3 className="text-md font-semibold mt-3 text-white">User Name</h3>
          <input value={userName} onChange={(e)=>setUserName(e.target.value)} className="w-80 border py-2 mt-2 px-3 rounded-lg bg-white" type="text" placeholder="*username" />
          </div>

          <button onClick={joinRoom} className="w-80 py-2 mt-8 px-3 bg-amber-500 rounded-lg text-black font-semibold cursor-pointer hover:bg-[#E85C0D] hover:text-white">Join Room</button>
         
          </div>
        </div>
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
