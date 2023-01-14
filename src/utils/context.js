export function getContext() {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  ctx.imageSmoothingEnabled = false;

  return ctx;
}
