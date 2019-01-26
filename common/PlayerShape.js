class PlayerShape {
  constructor(id, username, x, y, food, health) {
    this.id = id;
    this.username = username;
    this.x = x || Math.floor(Math.random() * 500);
    this.y = y || Math.floor(Math.random() * 400);
    this.food = food || 10;
    this.health = health || 100;
  }
}

module.exports = PlayerShape;