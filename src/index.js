import { BrickBreakerGame } from "./BrickBreakerGame.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants.js";

let cvs = document.createElement("canvas");
cvs.width = CANVAS_WIDTH;
cvs.height = CANVAS_HEIGHT;
document.body.append(cvs);

window.addEventListener("load", () => {
  let game = new BrickBreakerGame();

  let lastTime = 0;

  function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    game.ctx.clearRect(0, 0, game.canvasWidth, game.canvasHeight);

    game.update(deltaTime);
    game.draw(game.ctx);

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
});
