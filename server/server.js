const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

  socket.emit('newMessage',{
    from: 'Admin',
    text: 'Welcome to App',
    createdAt: new Date().getTime()
  });
  //emits to single user
  socket.broadcast.emit('newMessage',{
    from:'Admin',
    text:'New User',
    createdAt: new Date().getTime()
  })
  socket.on('createMessage',(message)=>{
    console.log('createMessage', message);
    //emits to all the connections
    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
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
