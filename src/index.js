import { BrickBreakerGame } from "./BrickBreakerGame.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants.js";

window.addEventListener("load", () => {
  let canvas = document.querySelector("#game");
  let ctx = canvas.getContext("2d");

  let game = new BrickBreakerGame(CANVAS_WIDTH, CANVAS_HEIGHT);

  let lastTime = 0;

  function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
});
