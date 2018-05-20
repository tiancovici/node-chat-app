const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {isRealString} = require('./utils/validation');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 4200;
let app = express();
let server = http.createServer(app)
let io = socketIO(server, {});
let users = new Users();

app.use(express.static(publicPath));

/// C o n n e c t i o n ////
io.on('connection', (socket)=> {
  console.log('New User connected');


  /// J o i n ////
  socket.on('join', (params, callback) => {
    // socket.leave('The office fans');
    // io.emit -> io.to('The office Fans').emit
    // socket.broadcast.emit -> socket.broadcast.to('The office Fans').emit
    // socket.emit ->

    if(!isRealString(params.name) || !isRealString(params.room)) {
      // Exit if data invalid
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id); // Remove user if already joined another room
    users.addUser(socket.id, params.name, params.room); // Add user to room

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    // Welcome user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // Introduce user to rest of users
    socket.broadcast.to(params.room).emit('newMessage',
      generateMessage('Admin', `${params.name} has joined`));



    callback()
  });

  /// D i s c o n n e c t e d ////
  socket.on('disconnect', ()=> {
    console.log(`${socket.id} User disconnected`);
    let user = users.removeUser(socket.id);
    console.log(users);
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });

  /// U p d a t e   U s e r    L i s t ////
  socket.on('updateUserList', function(users) {
    console.log('Users list', users);
  });

  /// C r e a t e    M e s s a g e ////
  socket.on('createMessage', (message, callback) => {
    // console.log('createMessage: ', message);
    //Send message to everyone
    io.emit('newMessage', generateMessage(message.from, message.text));
    if(callback) callback('This is from the server');
  });

  /// C r e a t e   L o c a t i o n    M e s s a g e ////
  socket.on('createLocationMessage', (coords)=> {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude,coords.longitude))
  });
});


server.listen(port, ()=> {
  console.log(`Started on port ${port}`);
});