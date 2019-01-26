const express = require('express')
const app = express();
const socketio = require('socket.io');
const expressServer = app.listen(process.env.PORT || 3000);
const io = socketio(expressServer);

const PlayerShape = require('./common/PlayerShape');

let players = [];
let meats = [];

meats = meatCreate();

app.use('/', express.static('client/dist'))

app.get('/players', function (req, res) {
  res.send(JSON.stringify(players));
})

io.sockets.on('connection', (socket) => {
  const { id } = socket;

  socket.on('start', (data, callback) => {
    const { x, y, username } = data;
    const player = new PlayerShape(id, username, x, y);

    callback({
      status: true,
      players: players,
      player: player
    });

    console.log("Connected Player: ", player, "\n");

    players.push(player);
  });

  socket.on('update', (data, callback) => {
    const player = players.find((player) => data.id === player.id);
    if (!!player) {
      const {x, y} = data;
      player.x = x;
      player.y = y;
      callback({
        health: player.health,
        food: player.food,
        meats
      });
    }
  });

  socket.on('hit', (data) => {
    const player = players.find((player) => data.id === player.id);
    if (!!player) {
      player.health -= data.damage;
    }
  });

  socket.on('meatEating', (data) => {
    meats = meats.filter(m => m.x !== data.x && m.y !== data.y);
    const player = players.find((player) => data.id === player.id);

    if (player.food) {
      player.food = data.food;
    }
  });

  socket.on('foodSpending', (data) => {
    const player = players.find((player) => data.id === player.id);

    if (player) {
      player.food = data.food;
      player.health = data.health;
    }
  })

  socket.on('disconnect', () => {
    players = players.filter(p => p.id !== socket.id);
  });

  socket.on('forceDisconnect', () => {
    players = players.filter(p => p.id !== socket.id);
    socket.disconnect();
  });
});


setInterval(() => {
  io.sockets.emit('heartbeat', { players, meats });
}, 33);


function meatCreate() {
  for (let i=0; i < 50; i++) {
    const x = Math.floor(Math.random() * 1000);
    const y = Math.floor(Math.random() * 1000);
    
    meats.push({ x, y });
  }

  return meats;
}
