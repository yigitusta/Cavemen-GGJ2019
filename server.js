const express = require('express')
const app = express();
const socketio = require('socket.io');
const expressServer = app.listen(process.env.PORT || 3000);
const io = socketio(expressServer);

const PlayerShape = require('./common/PlayerShape');

const players = [];

app.use('/', express.static('client/dist'))

app.get('/players', function (req, res) {
  res.send(JSON.stringify(players));
})

io.sockets.on('connection', (socket) => {
  socket.on('start', (data, callback) => {
    const { id } = socket;
    const { x, y, username } = data;
    const player = new PlayerShape(id, username, x, y);

    callback({
      status: true,
      players: players
    });

    console.log("Connected Player: ", player, "\n");

    players.push(player);
  });
});

setInterval(() => {
  io.sockets.emit('heartbeat', players);
},33);