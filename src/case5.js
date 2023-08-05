/**
 * @description 贝塞尔曲线
 */


function drawHeart(pos, option) {
  const { controlPoint1, controlPoint2 } = option;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.moveTo(pos.beginX, pos.beginY);
  ctx.bezierCurveTo(
    controlPoint1.x,
    controlPoint1.y,
    controlPoint2.x,
    controlPoint2.y,
    pos.endX,
    pos.endY,
  );
  ctx.moveTo(pos.beginX, pos.beginY);
  ctx.bezierCurveTo(
    pos.beginX + (pos.beginX - controlPoint1.x),
    controlPoint1.y,
    pos.beginX + (pos.beginX - controlPoint2.x),
    controlPoint2.y,
    pos.endX,
    pos.endY,
  );
  ctx.stroke();
  ctx.fillStyle = "red";
  ctx.fill();
}

drawHeart(
  { beginX: 144, beginY: 77, endX: 144, endY: 157 },
  { controlPoint1: { x: 60, y: 26 }, controlPoint2: { x: 71, y: 116 } },
);
