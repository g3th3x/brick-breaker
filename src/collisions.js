export function collisionDetect(ball, gameObject) {
  let ballBottom = ball.position.y + ball.ballRadius;

  let objectTop = gameObject.position.y;
  let objectLeftSide = gameObject.position.x;
  let objectRightSide = gameObject.position.x + gameObject.width;

  if (
    ballBottom >= objectTop &&
    ball.position.x >= objectLeftSide &&
    ball.position.x + ball.ballRadius <= objectRightSide
  ) {
    console.log("collision");
    return true;
  } else {
    return false;
  }
}
