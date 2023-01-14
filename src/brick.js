import { collisionDetect } from "./collisions.js";

export class Brick {
  constructor(game, position) {
    this.game = game;
    this.width = 50;
    this.height = 15;
    this.position = position;

    this.markToDelete = false;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#00f";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    if (collisionDetect(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;

      this.markToDelete = true;
      this.game.score++;
    }
  }
}
