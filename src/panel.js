export class Panel {
  constructor(game) {
    this.canvasWidth = game.canvasWidth;

    this.width = 200;
    this.height = 50;

    this.position = {
      x: game.canvasWidth / 2 - this.width / 2,
      y: game.canvasHeight - 100,
    };
  }
  draw(ctx) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    console.log("Yeap! I'm here.");
  }
}
