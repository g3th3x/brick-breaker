import { playSound } from "./audio.js";

export function collisionDetect(ball, gameObject) {
  let ballBottom = ball.position.y + ball.ballRadius;
  let ballTop = ball.position.y;

  let objectTop = gameObject.position.y;
  let objectBottom = gameObject.position.y + gameObject.height;
  let objectLeftSide = gameObject.position.x;
  let objectRightSide = gameObject.position.x + gameObject.width;

  if (
    ballBottom >= objectTop &&
    ballTop <= objectBottom &&
    ball.position.x >= objectLeftSide &&
    ball.position.x + ball.ballRadius <= objectRightSide
  ) {
    //console.log("collision");
    playSound();
    return true;
  } else {
    return false;
  }
}
