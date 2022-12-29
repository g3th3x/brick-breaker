export class Ball {
  constructor(game) {
    this.canvasWidth = game.canvasWidth;
    this.canvasHeight = game.canvasHeight;
    this.ballRadius = 8;

    this.start();
  }
  start() {
    this.position = { x: 0, y: 500 };
    this.speed = { x: 5, y: -5 };
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#f00";
    ctx.arc(this.position.x, this.position.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fill();
  }
  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
