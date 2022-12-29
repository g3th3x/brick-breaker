import { Panel } from "./panel.js";
import { InputHandler } from "./input.js";
import { Ball } from "./ball.js";

export class BrickBreakerGame {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.panel = new Panel(this);
    this.ball = new Ball(this);
    this.gameObjects = [];

    new InputHandler(this.panel, this);
  }
  start() {
    this.gameObjects = [this.panel, this.ball];
  }
  update(deltaTime) {
    this.start();
    this.gameObjects.forEach((object) => object.update(deltaTime));
  }
  draw(ctx) {
    this.gameObjects.forEach((object) => object.draw(ctx));
  }
}
