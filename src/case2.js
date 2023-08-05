/**
 * @description 方法 requestAnimationFrame 例子
 */
let start, previousTimeStamp;
let posX = 10,
  blockWidth = 10,
  animationId,
  isAnimating = false,
  v = 100;

let canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
ctx.fillRect(10, 10, 10, 10);
const cb = (timeStamp) => {
  if (start === undefined) {
    start = timeStamp;
  }

  const delta = (timeStamp - (previousTimeStamp || 0)) / 1000;

  const count = v * delta;
  posX += count;
  console.log(posX, "posx", ctx.canvas.width, v);
  if (posX >= ctx.canvas.width - blockWidth || posX <= 0) {
    v = -v;
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillRect(posX, 10, blockWidth, 10);
  previousTimeStamp = timeStamp;
  if (isAnimating) {
    animationId = window.requestAnimationFrame(cb);
  }
};

startAnimation();

function stopAnimation() {
  if (isAnimating) {
    isAnimating = false;
  }
  animationId && window.cancelAnimationFrame(animationId);
}
function startAnimation() {
  if (!isAnimating) {
    isAnimating = true;
  }
  animationId = window.requestAnimationFrame(cb);
}

document.addEventListener("visibilitychange", () => {
  console.log("vvvv", document.hidden, animationId);

  if (document.hidden) {
    stopAnimation();
  } else {
    startAnimation();
  }
});
