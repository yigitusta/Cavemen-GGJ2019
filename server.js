var express = require('express')
var app = express();
const path = require('path');
const socketio = require('socket.io');

app.use('/', express.static('client/dist'))

const expressServer = app.listen(process.env.PORT || 3000);

const io = socketio(expressServer);
const players = [];

io.sockets.on('connection', (socket) => {
  socket.on('start', (data, callback) => {
    const player = {
      id: socket.id,
      x: data.x,
      y: data.y,
      username: data.username
    };

    callback("user succesfull");
    players.push(player);
    console.log(players);
  });
});

setInterval(() => {
  io.sockets.emit('heartbeat', players);
},33);