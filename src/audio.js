export function playSound() {
  const audio = new Audio();
  audio.preload = "auto";
  audio.src = "../audio/hit.wav";
  audio.play();
}
