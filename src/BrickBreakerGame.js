import { Panel } from "./panel.js";

export class BrickBreakerGame {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.panel = new Panel(this);
    this.gameObjects = [];
  }

  start() {
    this.gameObjects = [this.panel];
  }
  update(deltaTime) {
    this.start();
  }
  draw(ctx) {
    this.gameObjects.forEach((object) => object.draw(ctx));
  }
}
