/**
 * @description 画大转盘
 */
import getRandomColor from "./common/getRandomColor";

const pos = { x: 120, y: 120 },
  options = { radius: 100, angle: 0, count: 8 };
const colors = new Array(options.count).fill(0).map(() => getRandomColor());
function drawBigwheel() {
  const drawCount = 8;
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  let angle = options.angle;
  for (let i = 0; i < drawCount; i++) {
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.arc(
      pos.x,
      pos.y,
      options.radius,
      angle,
      angle + (Math.PI * 2) / drawCount,
    );

    ctx.fillStyle = colors[i];
    ctx.fill();
    angle += (Math.PI * 2) / drawCount;
    ctx.closePath();
  }
}
function spinWheel() {
  options.angle +=0.1
  drawBigwheel();
  console.log("spinWheel", options.angle);
  // if (spinSpeed > 0) {
  //   spinSpeed -= 0.001; // 逐渐减速
  // }
  requestAnimationFrame(spinWheel);
}

drawBigwheel(pos, options);

spinWheel();
