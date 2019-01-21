import Phaser from 'phaser';

export function drawGraphics({ x, y, width, height}, ctx) {
	const graphics = new Phaser.GameObjects.Graphics(ctx);
	const rect = new Phaser.Geom.Rectangle(x, y, width, height);
	// const rect = new CustomGraphics(this.customScene, this.customOptions);
	graphics.fillRectShape(rect); // rect: {x, y, width, height}
	graphics.fillRect(x, y, width, height);
	graphics.strokeRectShape(rect);  // rect: {x, y, width, height}
	graphics.strokeRect(x, y, width, height);
	return graphics;
};