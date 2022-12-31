import { Panel } from "./panel.js";
import { InputHandler } from "./input.js";
import { Ball } from "./ball.js";
import { stageMaker, stage1 } from "./stages.js";

export class BrickBreakerGame {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.panel = new Panel(this);
    this.ball = new Ball(this);
    this.bricks = [];
    this.stages = [stage1];
    this.gameObjects = [];
    this.lives = 1;

    new InputHandler(this.panel, this);
  }
  start() {
    this.bricks = stageMaker(this, this.stages[0]);
    this.gameObjects = [this.panel, this.ball];
  }
  update(deltaTime) {
    this.start();
    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.update(deltaTime)
    );
  }
  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));
    // Draw lives
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Lives: ${this.lives}`, 10, 25);
  }
}
