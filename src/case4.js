/**
 * @description 事件监听,鼠标点击绘制圆
 *
 */
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.strokeStyle = "yellow";
  ctx.stroke();
}
canvas.addEventListener(
  "click",
  function (event) {
    const x = event.clientX;
    const y = event.clientY;
    drawCircle(x, y);
  },
  false,
);
