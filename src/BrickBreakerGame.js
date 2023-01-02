import { Panel } from "./panel.js";
import { InputHandler } from "./input.js";
import { Ball } from "./ball.js";
import { stageMaker, stage1 } from "./stages.js";
import { GAME_STATE } from "./constants.js";

export class BrickBreakerGame {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.gameState = GAME_STATE.START;
    this.panel = new Panel(this);
    this.ball = new Ball(this);
    this.bricks = [];
    this.stages = [stage1];
    this.gameObjects = [];
    this.lives = 2;

    new InputHandler(this.panel, this);
  }
  start() {
    this.bricks = stageMaker(this, this.stages[0]);
    this.gameObjects = [this.panel, this.ball];
  }
  update(deltaTime) {
    if (this.lives === 0) this.gameState = GAME_STATE.GAMEOVER;

    if (this.gameState === GAME_STATE.GAMEOVER) return;

    if (this.bricks.length === 0) {
      this.start();
    }

    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter((brick) => !brick.markToDelete);
  }
  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));
    // PAUSE GAME
    if (this.gameState === GAME_STATE.PAUSE) {
      ctx.beginPath();
      ctx.rect(0, 0, this.canvasWidth, this.canvasHeight);
      ctx.fillStyle = "rgba(0,0,0,.5)";
      ctx.fill();

      ctx.font = "20px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("PAUSE", this.canvasWidth / 2, this.canvasHeight / 2);
    }
    // GAME OVER
    if (this.gameState === GAME_STATE.GAMEOVER) {
      ctx.beginPath();
      ctx.rect(0, 0, this.canvasWidth, this.canvasHeight);
      ctx.fillStyle = "rgba(0,0,0,.5)";
      ctx.fill();

      ctx.font = "20px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.canvasWidth / 2, this.canvasHeight / 2);
    }

    // Draw lives
    ctx.beginPath();
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "left";
    ctx.fillText(`Lives: ${this.lives}`, 10, 25);
  }
  pauseGame() {
    if (this.gameState !== GAME_STATE.PAUSE) {
      this.gameState = GAME_STATE.PAUSE;
    }
  }
}
