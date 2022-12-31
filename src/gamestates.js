import { GAME_STATE } from "./constants.js";

export function gameOver(gameState) {
  if (this.gameState === GAME_STATE.GAMEOVER) {
    ctx.rect(0, 0, this.gameWidth, this.gameHeight);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
  }
}
