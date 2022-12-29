export class Panel {
  constructor(game) {
    this.canvasWidth = game.canvasWidth;

    this.width = 200;
    this.height = 50;

    this.speed = 0;

    this.position = {
      x: game.canvasWidth / 2 - this.width / 2,
      y: game.canvasHeight - this.height - 15,
    };
  }
  moveLeft() {
    this.speed = -5;
  }
  moveRight() {
    this.speed = 5;
  }
  stop() {
    this.speed = 0;
  }
  draw(ctx) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update(deltaTime) {
    this.position.x += this.speed;
  }
}
