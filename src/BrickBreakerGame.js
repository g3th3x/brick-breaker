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
      shadowScreen(ctx, this.canvasWidth, this.canvasHeight);
      showLogo(ctx, this.canvasWidth, this.canvasHeight);
      showText(
        ctx,
        "Press ENTER to START",
        this.canvasWidth,
        this.canvasHeight + 90
      );
      showText(
        ctx,
        "Left or right arrow - moving left or right",
        this.canvasWidth,
        this.canvasHeight + 190
      );
      showText(
        ctx,
        "P - pause game",
        this.canvasWidth,
        this.canvasHeight + 250
      );
      showText(
        ctx,
        "R - restart game",
        this.canvasWidth,
        this.canvasHeight + 310
      );
    }
    // PAUSE GAME
    if (this.gameState === GAME_STATE.PAUSE) {
      shadowScreen(ctx, this.canvasWidth, this.canvasHeight);
      showText(ctx, "PAUSE", this.canvasWidth, this.canvasHeight);
    }
    // GAME OVER
    if (this.gameState === GAME_STATE.GAMEOVER) {
      shadowScreen(ctx, this.canvasWidth, this.canvasHeight);
      showText(ctx, "GAME OVER", this.canvasWidth, this.canvasHeight);
      showText(
        ctx,
        "Press R to RESTART",
        this.canvasWidth,
        this.canvasHeight + 60
      );
    }
    // WINNER
    if (this.gameState === GAME_STATE.WINNER) {
      shadowScreen(ctx, this.canvasWidth, this.canvasHeight);
      showText(
        ctx,
        "CONGRATULATIONS, YOU'VE WON",
        this.canvasWidth,
        this.canvasHeight
      );
      showText(
        ctx,
        "Press R to RESTART",
        this.canvasWidth,
        this.canvasHeight + 60
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
    if (this.gameState != GAME_STATE.GAMEOVER)
      this.gameState !== GAME_STATE.PAUSE
        ? (this.gameState = GAME_STATE.PAUSE)
        : (this.gameState = this.gameState.START);
  }
  restartGame() {
    document.location.reload();
  }
}

function shadowScreen(ctx, canvasWidth, canvasHeight) {
  ctx.beginPath();
  ctx.fillStyle = "rgba(0,0,0,.5)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function showText(ctx, text, canvasWidth, canvasHeight) {
  ctx.beginPath();
  ctx.font = "bold 20px Arial";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);
}

function showLogo(ctx, canvasWidth, canvasHeight) {
  ctx.beginPath();
  ctx.font = "bold 60px Arial";
  ctx.fillStyle = "#FFFF00";
  ctx.textAlign = "center";
  ctx.fillText("BRICK BREAKER", canvasWidth / 2, canvasHeight / 2 - 80);
}
