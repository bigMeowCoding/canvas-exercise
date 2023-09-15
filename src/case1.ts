/**
 * @description 官网requestAnimationFrame示例
 */
const element = document.getElementById("block");
let start, previousTimeStamp;
let done = false;
const canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
function makeLineGradient() {
  if (!element) {
    return;
  }
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height / 2);
  gradient.addColorStop(0, "blue");
  gradient.addColorStop(0.25, "white");
  gradient.addColorStop(0.5, "purple");
  gradient.addColorStop(0.75, "red");
  gradient.addColorStop(1, "yellow");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
}
function makeRadialGradient() {
  if (!element) {
    return;
  }
  const gradient = context.createRadialGradient(
    canvas.width / 2,
    canvas.height - 200,
    100,
    canvas.width / 2,
    100,
    200,
  );
  gradient.addColorStop(0, "blue");
  gradient.addColorStop(0.25, "white");
  gradient.addColorStop(0.5, "purple");
  gradient.addColorStop(0.75, "red");
  gradient.addColorStop(1, "yellow");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
}
// makeLineGradient();
// makeRadialGradient();
// function step(timeStamp) {
//   if (start === undefined) {
//     start = timeStamp;
//   }
//   makeGradient();
//   const elapsed = timeStamp - start;
//
//   if (previousTimeStamp !== timeStamp) {
//     // Math.min() is used here to make sure the element stops at exactly 200px
//     const count = Math.min(0.1 * elapsed, 200);
//     element.style.transform = `translateX(${count}px)`;
//     if (count === 200) done = true;
//   }
//
//   if (elapsed < 2000) {
//     // Stop the animation after 2 seconds
//     previousTimeStamp = timeStamp;
//     if (!done) {
//       window.requestAnimationFrame(step);
//     }
//   }
// }
//
// window.requestAnimationFrame(step);

function drawRectange() {
  // context.save();
  // context.strokeStyle = "red";
  // context.shadowColor = "rgba(0,0,0,.7)";
  // context.shadowOffsetX = -1;
  // context.shadowOffsetY = -1;
  // context.shadowBlur = 2;
  // context.strokeRect(0, 0, 100, 100);
  // context.restore();
  context.rect(0, 0, 100, 100);
  context.stroke();

  context.rect(300, 300, 100, 100);
  context.stroke();
}
function drawCircle() {
  context.save();
  // context.strokeStyle = "red";
  context.lineWidth = 1;
  context.shadowColor = "blue";
  context.shadowOffsetX = -1;
  context.shadowOffsetY = -1;
  context.strokeStyle = "rgba(0,0,255,.6)";
  context.shadowBlur = 2;
  context.beginPath();
  context.arc(canvas.width / 2, canvas.height / 2, 60, Math.PI * 2, false);
  context.clip();
  context.stroke();
  context.restore();
}

drawRectange();
// drawCircle();
