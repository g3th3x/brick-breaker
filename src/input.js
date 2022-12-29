export class InputHandler {
  constructor(panel) {
    document.addEventListener("keydown", (e) => {
      // console.log(e.code);
      switch (e.code) {
        case "ArrowRight":
          panel.moveRight();
          break;
        case "ArrowLeft":
          panel.moveLeft();
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
