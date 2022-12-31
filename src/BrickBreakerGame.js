import { Panel } from "./panel.js";
import { InputHandler } from "./input.js";
import { Ball } from "./ball.js";
import { Brick } from "./brick.js";

export class BrickBreakerGame {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.panel = new Panel(this);
    this.ball = new Ball(this);
    this.brick = new Brick(this);
    this.gameObjects = [];
    this.lives = 1;

    new InputHandler(this.panel, this);
  }
  start() {
    this.gameObjects = [this.panel, this.ball, this.brick];
  }
  update(deltaTime) {
    this.start();
    this.gameObjects.forEach((object) => object.update(deltaTime));
  }
  draw(ctx) {
    this.gameObjects.forEach((object) => object.draw(ctx));
    // Draw lives
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Lives: ${this.lives}`, 10, 25);
  }
}
