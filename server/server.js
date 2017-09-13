const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
//better way of specifying path
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
//creating http server to enable use of socket.io
var server = http.createServer(app);
//configure socketIO
var io = socketIO(server);
//setting up static directory
app.use(express.static(publicPath));
//regitering event listener
io.on('connection',(socket)=>{
  console.log('New User connected');

  socket.emit('newMessage',generateMessage('Admin', 'Welcome to chat app'));
  //emits to single user
  socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));
  socket.on('createMessage',(message,callback)=>{
    console.log('createMessage', message);
    //emits to all the connections
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('This is from server side');
    // socket.broadcast.emit('newMessage',{
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // })
  });

  socket.on('disconnect',()=>{
    console.log('User Disconnected');
  });
});
server.listen(port,()=>{
  console.log("Server is up on ", port);
});
