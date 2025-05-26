import io from "socket.io-client"
import './App.css'

const socket = io("http://localhost:7777");

function App() {


  return (
    <div>
      <h1>Welcome to Code Loom.</h1>
    </div>
  )
}

export default App
