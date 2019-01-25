export default class PlayerShape {
  constructor({id, x, y, food, health, username}) {
    this.id = id;
    this.x = x || Math.floor(Math.random() * 500);
    this.y = y || Math.floor(Math.random() * 400);
    this.food = food || 100;
    this.health = health || 100;
    this.username = username;
  }
}