export class Ball {
  constructor(game) {
    this.canvasWidth = game.canvasWidth;
    this.canvasHeight = game.canvasHeight;
    this.ballRadius = 8;

    this.start();
  }
  start() {
    this.position = { x: 10, y: 100 };
    this.speed = { x: 5, y: 5 };
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
    // Ball Restrictions
    // Top
    if (this.position.y - this.ballRadius < 0) {
      this.speed.y = -this.speed.y;
    }
    // Left or Right
    if (
      this.position.x + this.ballRadius > this.canvasWidth ||
      this.position.x - this.ballRadius < 0
    ) {
      this.speed.x = -this.speed.x;
    }
    // Bottom
    if (this.position.y + this.ballRadius > this.canvasHeight) {
      this.speed.y = -this.speed.y;
    }
  }
}
