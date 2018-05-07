const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 4200;
let app = express();
let server = http.createServer(app)
let io = socketIO(server, {});

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
  console.log('New User connected');

  socket.on('createMessage', (message) => {
    console.log('createMessage: ', message);

    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnected', (socket)=> {
    console.log('User disconnected');
  });

});


server.listen(port, ()=> {
  console.log(`Started on port ${port}`);
});