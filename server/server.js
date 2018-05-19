const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');


const publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 4200;
let app = express();
let server = http.createServer(app)
let io = socketIO(server, {});

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
  console.log('New User connected');

  // Welcome user
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // Introduce user to rest of users
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    // console.log('createMessage: ', message);
    //Send message to everyone
    io.emit('newMessage', generateMessage(message.from, message.text));
    if(callback) callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords)=> {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude,coords.longitude))
  });

  socket.on('disconnected', (socket)=> {
    console.log('User disconnected');
  });

});


server.listen(port, ()=> {
  console.log(`Started on port ${port}`);
});