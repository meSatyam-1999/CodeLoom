import express from "express"
import dotenv from "dotenv"

const app  = express();
dotenv.config();

const port = process.env.PORT || 7777;

app.listen(port,()=>{
    console.log(`Server is started on: http://localhost:${port}`);
})

app.use("/test",(req,res)=>{
    res.send("Welcome to the testing backend server.");
})