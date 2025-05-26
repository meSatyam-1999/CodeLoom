import express from "express"
import dotenv from "dotenv"
import http from "http"
import { Server } from "socket.io";

const app  = express();
dotenv.config();

const server = http.createServer(app);
const port = process.env.PORT || 7777;

//creating room
const rooms = new Map(); 


// socket connection in backend
const io = new Server(server,{
    cors: {
        origin: "*"
    },
});

io.on("connection",(socket)=>{
    console.log("User Connected", socket.id);

    //check if user is currently joind a room or not

    let currentRoom = null;
    let currentUser = null;

    socket.on("join",({roomId, userName})=>{
        //if we found user is in currentroom then we make this rule for user
        if(currentRoom){
            socket.leave(currentRoom);
            rooms.get(currentRoom).delete(currentUser);
            io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));
        }

        currentRoom = roomId;
        currentUser = userName;

        socket.join(roomId);

        if(!rooms.has(roomId)){
            rooms.set(roomId, new Set());
        }

        rooms.get(roomId).add(userName)

        io.to(roomId).emit("userJoined", Array.from(rooms.get(currentRoom)));
    })
})




server.listen(port,()=>{
    console.log(`Server is started on: http://localhost:${port}`);
})

