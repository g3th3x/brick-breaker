import { Panel } from "./panel.js";
import { InputHandler } from "./input.js";
import { Ball } from "./ball.js";
import { stageMaker, stages } from "./stages.js";
import { GAME_STATE, LIVES, CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants.js";
import { getContext } from "./utils/context.js";

export class BrickBreakerGame {
  ctx = getContext();

  constructor() {
    this.canvasWidth = CANVAS_WIDTH;
    this.canvasHeight = CANVAS_HEIGHT;
    this.gameState = GAME_STATE.MAINMENU;
    this.panel = new Panel(this);
    this.ball = new Ball(this);
    this.bricks = [];
    this.stages = stages;
    this.nextStage = 0;
    this.gameObjects = [];
    this.lives = LIVES;
    this.score = 0;

    new InputHandler(this.panel, this);
  }
  start() {
    if (
      this.gameState !== GAME_STATE.MAINMENU &&
      this.gameState !== GAME_STATE.NEXTSTAGE
    )
      return;

    this.bricks = stageMaker(this, this.stages[this.nextStage]);
    this.ball.start();
    this.gameObjects = [this.panel, this.ball];

    this.gameState = GAME_STATE.START;
  }
  update(deltaTime) {
    if (
      this.gameState === GAME_STATE.WINNER ||
      this.gameState === GAME_STATE.GAMEOVER ||
      this.gameState === GAME_STATE.PAUSE ||
      this.gameState === GAME_STATE.MAINMENU
    )
      return;

    if (this.lives === 0) this.gameState = GAME_STATE.GAMEOVER;

    if (this.bricks.length === 0) {
      if (this.nextStage++ != this.stages.length - 1) {
        this.gameState = GAME_STATE.NEXTSTAGE;
        this.start();
      } else {
        this.gameState = GAME_STATE.WINNER;
      }
    }

    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter((brick) => !brick.markToDelete);
  }
  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));
    // MAIN MENU
    if (this.gameState === GAME_STATE.MAINMENU) {
      screenShadow(ctx, this.canvasWidth, this.canvasHeight);

      ctx.font = "20px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press ENTER to START",
        this.canvasWidth / 2,
        this.canvasHeight / 2
      );
      ctx.fillText(
        "Left or right arrow - moving left or right",
        this.canvasWidth / 2,
        this.canvasHeight / 2 + 60
      );
      ctx.fillText(
        "P - pause game",
        this.canvasWidth / 2,
        this.canvasHeight / 2 + 90
      );
      ctx.fillText(
        "R - restart game",
        this.canvasWidth / 2,
        this.canvasHeight / 2 + 120
      );
    }
    // PAUSE GAME
    if (this.gameState === GAME_STATE.PAUSE) {
      screenShadow(ctx, this.canvasWidth, this.canvasHeight);

      ctx.font = "20px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("PAUSE", this.canvasWidth / 2, this.canvasHeight / 2);
    }
    // GAME OVER
    if (this.gameState === GAME_STATE.GAMEOVER) {
      screenShadow(ctx, this.canvasWidth, this.canvasHeight);

      ctx.font = "20px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.canvasWidth / 2, this.canvasHeight / 2);
    }
    // WINNER
    if (this.gameState === GAME_STATE.WINNER) {
      screenShadow(ctx, this.canvasWidth, this.canvasHeight);

      ctx.font = "40px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText(
        "CONGRATULATIONS YOU WON!",
        this.canvasWidth / 2,
        this.canvasHeight / 2
      );
    }
    // Draw lives
    let currentStage = 1 + this.nextStage;
    ctx.beginPath();
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "left";
    ctx.fillText(
      `Lives: ${this.lives} Stage: ${currentStage} Score: ${this.score}`,
      10,
      25
    );
  }
  pauseGame() {
    if (this.gameState !== GAME_STATE.PAUSE) {
      this.gameState = GAME_STATE.PAUSE;
    } else {
      this.gameState = this.gameState.START;
    }
  }
  restartGame() {
    document.location.reload();
  }
}

function screenShadow(ctx, canvasWidth, canvasHeight) {
  ctx.beginPath();
  ctx.rect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "rgba(0,0,0,.5)";
  ctx.fill();
}
