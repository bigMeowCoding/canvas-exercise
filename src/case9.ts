/**
 * @description spriteimage
 */

const canvas = document.getElementById("canvas") as HTMLCanvasElement,
  context = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 250;

const spriteImage = new Image();
spriteImage.src = "/src/static/images/running-sprite-sheet.png";

function drawSpriteImage() {
  context.drawImage(spriteImage, 0, 0);
}

function drawBackGround() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const vertical_line_space = 12;
  let i = context.canvas.height;
  context.strokeStyle = "lightgray";
  context.lineWidth = 0.5;
  while (i > 4 * vertical_line_space) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(canvas.width, i);

    context.stroke();
    i -= vertical_line_space;
  }
}

spriteImage.onload = function () {
  drawSpriteImage();
};

function posWindowToCanvas(x: number, y: number) {
  const { width, height, left, top } = canvas.getBoundingClientRect();
  return {
    x: ((x - left) * canvas.width) / width,
    y: ((y - top) * canvas.height) / height,
  };
}

function updateReadOut(x: number, y: number) {
  const readOut = document.getElementById("readout");
  if (readOut) {
    readOut.innerText = `(${x.toFixed(0)},${y.toFixed(0)})`;
  }
}

function drawHorizontalLine(y: number) {
  context.beginPath();
  context.moveTo(0, y + 0.5);
  context.lineTo(canvas.width, y + 0.5);
  context.stroke();
}

function drawVerticalLine(x: number) {
  context.beginPath();
  context.moveTo(x + 0.5, 0);
  context.lineTo(x + 0.5, canvas.height);
  context.stroke();
}

function drawGuideLine(x: number, y: number) {
  context.lineWidth = 0.5;
  context.strokeStyle = "rgba(0,0,230,0.8)";
  drawHorizontalLine(y);
  drawVerticalLine(x);
}

canvas.onmousemove = (e) => {
  console.log('onmouseenter')
  const { clientY, clientX } = e;
  const { x, y } = posWindowToCanvas(clientX, clientY);
  drawBackGround();
  drawSpriteImage();
  drawGuideLine(x, y);
  updateReadOut(x, y);
};
canvas.onmousedown =function () {
  console.log('mousedown')
}
canvas.onmouseenter = (e) => {
  console.log('onmouseenter')

};
drawBackGround();
