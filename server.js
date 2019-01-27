const express = require('express')
const app = express();
const socketio = require('socket.io');
const expressServer = app.listen(process.env.PORT || 3000);
const io = socketio(expressServer);

const PlayerShape = require('./common/PlayerShape');

let players = [];
let meats = [];
const day = {
  number: 120,
  period: 'morning'
};

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
        food: player.food
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

    if (player) {
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

  socket.on('healthExtract', (data) => {
    const player = players.find((player) => data.id === player.id);

    if (player) {
      player.health = data.health;
    }
  })


  socket.on('disconnect', () => {
    const disconnectedPlayer = players.find((player) => socket.id === player.id);
    players = players.filter(p => p.id !== socket.id);
    if (disconnectedPlayer) {
      socket.broadcast.emit('new-meat', {
        x: disconnectedPlayer.x,
        y: disconnectedPlayer.y,
        food: disconnectedPlayer.food
      });
    }
  });

  socket.on('forceDisconnect', () => {
    socket.disconnect();
  });

  socket.on('message', ({x, y, message}) => {
    socket.broadcast.emit('message',
    {
      id: socket.id,
      x, y, message
    });
  });
});


setInterval(() => {
  if (day.number == 0) {
    if (day.period == 'morning') {
      day.period = 'night';
      day.number = 60;
    } else {
      day.period = 'morning';
      day.number = 120;
    }
  } else {
    day.number--;
  }

  io.sockets.emit('dayCycle', day);
}, 1000);


setInterval(() => {
  io.sockets.emit('heartbeat', { players, meats });
}, 33);


function meatCreate() {
  for (let i=0; i < 50; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);

    meats.push({ x, y });
  }

  return meats;
}
