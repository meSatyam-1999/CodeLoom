import express from "express"
import dotenv from "dotenv"
import http from "http"
import { Server } from "socket.io";

const app  = express();
dotenv.config();

const server = http.createServer(app);
const port = process.env.PORT || 7777;



// socket connection in backend
const io = new Server(server,{
    cors: {
        origin: "*"
    },
});

io.on("connection",(socket)=>{
    console.log("User Connected", socket.id);
})




server.listen(port,()=>{
    console.log(`Server is started on: http://localhost:${port}`);
})

