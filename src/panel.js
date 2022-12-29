export class Panel {
  constructor(game) {
    this.canvasWidth = game.canvasWidth;
    this.canvasHeight = game.canvasHeight;

    this.width = 100;
    this.height = 15;

    this.panelSpeed = 8;
    this.speed = 0;

    this.start();
  }
  start() {
    this.position = {
      x: this.canvasWidth / 2 - this.width / 2,
      y: this.canvasHeight - this.height - 15,
    };
    console.log(this.position);
  }
  moveLeft() {
    this.speed = -this.panelSpeed;
  }
  moveRight() {
    this.speed = this.panelSpeed;
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
    // Panel Restrictions
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.canvasWidth)
      this.position.x = this.canvasWidth - this.width;
  }
}
