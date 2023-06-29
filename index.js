const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //used to interact with MONGODB server
const userRoutes = require('./routes/userRoutes'); //import userRoutes
const messageRoutes = require('./routes/messageRoutes'); //import messageRoutes

const app = express(); //create express server
const socket = require("socket.io");
require('dotenv').config(); //allows us to have environment variables in .env file




app.use(cors()); //cors middleware
app.use(express.json()); //allows us to parse json

app.use("/api/auth", userRoutes); //use userRoutes for /api/auth
app.use("/api/messages", messageRoutes); //use messageRoutes for /api/messages

//connect to mongodb server
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => { 
    console.log('MongoDB connected!');
}).catch((err) => {
    console.log(err.message);
}); 



//start server
const server = app.listen(process.env.PORT || 8080 , () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
}); 

const io = socket(server, {
    cors: {
      origin: ["https://chitchatanytime.netlify.app", "http://localhost:3000"],
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.message);
      }
    });
  });