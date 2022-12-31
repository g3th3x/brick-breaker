import { Brick } from "./brick.js";

export function stageMaker(game, stage) {
  let bricks = [];

  stage.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 80 * brickIndex,
          y: 75 + 10 * rowIndex,
        };
        bricks.push(new Brick(game, position));
      }
    });
  });

  return bricks;
}

export const stage1 = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
];
