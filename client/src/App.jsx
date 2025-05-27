import io from "socket.io-client";
import "./App.css";
import { useState } from "react";
import Editor from "@monaco-editor/react"


const socket = io("http://localhost:7777");



function App() {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("1234");
  const [userName, setUserName] = useState("satyam");
  const [language,setLanguage] = useState("javascript");
  const [code,setCode] = useState("");
  const [copySuccess,setCopySuccess] = useState("");

  //join button fuction for joining room
  const joinRoom = () => {
    if (roomId && userName) {
      socket.emit("join", { roomId, userName });
      setJoined(true);
    }
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId)
    setCopySuccess("Copied")
    setTimeout(()=>setCopySuccess(""),2000);
  }

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  }

  if (!joined) {
    return (
      <div className="join-container bg-black w-full h-screen">
        <div className="join-form flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold mt-15 text-amber-500 font-serif">
            Join Code Room
          </h1>

          <div className="form-border border mt-15 px-8 py-18 rounded-lg border-white">
            <div>
              <h3 className="text-md font-semibold text-white">Room Id</h3>
              <input
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-80 border py-2 mt-2 px-3 rounded-lg bg-white"
                type="text"
                placeholder="*roomid"
              />
            </div>

            <div>
              <h3 className="text-md font-semibold mt-3 text-white">
                User Name
              </h3>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-80 border py-2 mt-2 px-3 rounded-lg bg-white"
                type="text"
                placeholder="*username"
              />
            </div>

            <button
              onClick={joinRoom}
              className="w-80 py-2 mt-8 px-3 bg-amber-500 rounded-lg text-black font-semibold cursor-pointer hover:bg-[#E85C0D] hover:text-white"
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-container flex h-[100vh]">

      {/* sidebar section */}
      <div className="side-bar w-[250px] p-[4.5rem] bg-[#123458] text-white">
      
        <div className="room-info flex flex-col justify-center items-center mb-[1rem]">
          <h2 className="mb-[1rem] font-bold text-2xl">Room Code: <span className="text-red-600">{roomId}</span></h2>
          <button onClick={copyRoomId} className="bg-amber-500 rounded-md px-1 py-1 font-bold cursor-pointer text-black mr-9">Copy Id</button>
          {copySuccess && <span className="copy-success text-green-400">{copySuccess}</span>}
        </div>


        <h3 className="mt-[1.5rem] mb-[.5rem] text-2xl font-bold">Users in Room: </h3>
        <ul>
          <li className="p-[.5rem] text-lg bg-gray-500 mt-4 rounded-lg w-30">Satyam</li>
          <li className="p-[.5rem] text-lg bg-gray-500 mt-4 rounded-lg w-30">Pandu</li>
        </ul>
        <p className="typing-indicator mt-[1rem] text-lg font-bold text-[#14C38E]">User Typing...</p>
        <select value={language} onChange={(e)=>setLanguage(e.target.value)} className="language-selector w-30 p-[.5rem] mt-[1rem] bg-white text-black rounded-lg font-semibold cursor-pointer">
          <option value="javascript">Javascript</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="rust">Rust</option>
        </select>
        <button className="leave-room-btn mt-[1.5rem] w-30 p-[.50rem] bg-red-600 text-white cursor-pointer rounded-lg font-bold">Leave</button>
      </div>

      {/* editor-ui section*/}
      <div className="editor-wrapper flex-grow h-full">
        <Editor 
          height="100%"
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={
            {
              minimap: {enabled: false},
              fontSize: 22,
            }
          }
        />
      </div>

    </div>
  );
}

export default App;
