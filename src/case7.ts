/**
 * @description 书上时钟demo
 */
const canvas = document.getElementById("canvas") as HTMLCanvasElement,
  context = canvas.getContext("2d");
const MARGIN = 35,
  NUM_SPACE = 20;
const RADIUS = canvas.width / 2 - MARGIN,
  HAND_RADIUS = RADIUS + NUM_SPACE,
  HAND_TRUNCATION = canvas.width / 25,
  HOUR_HAND_TRUNCATION = canvas.width / 10;

function drawCircle() {
  context.beginPath();
  context.arc(
    canvas.width / 2,
    canvas.height / 2,
    RADIUS,
    0,
    Math.PI * 2,
    true,
  );
  context.stroke();
}
function drawCenter() {
  context.beginPath();
  context.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2, true);
  context.fill();
}

function drawNumber() {
  const nums = new Array(12).fill(0).map((_, i) => {
    return i + 1;
  });
  nums.forEach((num) => {
    const angle = (Math.PI / 6) * (num - 3);
    context.fillText(
      num + "",
      canvas.width / 2 + HAND_RADIUS * Math.cos(angle),
      canvas.height / 2 + HAND_RADIUS * Math.sin(angle),
    );
  });
}
function drawHand(time, isHour, lineWidth) {
  const angle = Math.PI * 2 * (time / 60) - Math.PI / 2;
  const radius = isHour
    ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION
    : RADIUS - HAND_TRUNCATION;
  context.moveTo(canvas.width / 2, canvas.height / 2);
  context.lineTo(
    canvas.width / 2 + radius * Math.cos(angle),
    canvas.height / 2 + radius * Math.sin(angle),
  );
  context.stroke();
}
function drawHands() {
  const date = new Date();
  let hour = date.getHours();
  hour = hour > 12 ? hour - 12 : hour;
  drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true, 0.5);
  drawHand(date.getMinutes(), false, 0.5);
  drawHand(date.getSeconds(), false, 0.2);
}

function drawClock() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  drawCenter();
  drawNumber();
  drawHands();
}
window.setInterval(drawClock, 1000);
