export class InputHandler {
  constructor(panel, game) {
    document.addEventListener("keydown", (e) => {
      //console.log(e.code);
      switch (e.code) {
        case "ArrowRight":
          panel.moveRight();
          break;
        case "ArrowLeft":
          panel.moveLeft();
          break;
        case "Enter":
          game.start();
          break;
        case "KeyP":
          game.pauseGame();
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "ArrowRight":
          if (panel.speed !== 0) panel.stop();
          break;
        case "ArrowLeft":
          if (panel.speed !== 0) panel.stop();
          break;
      }
    });
  }
}
