/**
 * @description createImage demo test
 */
const canvas = document.getElementById("canvas") as HTMLCanvasElement,
  context = canvas.getContext("2d");
const img = new Image();
const bg = new Image();
const pansIcon1 = new Image();
const CANVAS_WIDTH = context.canvas.width;
const CANVAS_HEIGHT = context.canvas.height;
// bg.src = "/src/images/1.jpeg";
img.src =
  "https://image-c.weimobwmc.com/ol-6LEtw/04f03ec2becc4135a1d5246dc8503243.png";
bg.src =
  "https://image-c.weimobwmc.com/ol-6LEtw/5b3b2f175218476695bbe7e89abc63c9.png";
const imgList = [
  "https://image-c.weimobwmc.com/ol-6LEtw/04f03ec2becc4135a1d5246dc8503243.png",
  "https://image-c.weimobwmc.com/ol-6LEtw/5b3b2f175218476695bbe7e89abc63c9.png",
];
const pans1Src =
  "https://image-c.weimobwmc.com/ol-6LEtw/eb9f643802a84bf1a27529539a9c34a7.png";
let flag = 0;
pansIcon1.src = pans1Src;

function drawContent() {
  context.save();
  const width = img.width,
    height = img.height;
  // console.log(
  //   (width * width) / CANVAS_WIDTH,
  //   (height * height) / CANVAS_HEIGHT,
  // );
  context.translate(canvas.width / 2, canvas.height / 2);
  console.log(0, 0, width, height, -283, -283, width * 0.5, height * 0.5);
  context.drawImage(
    img,
    0,
    0,
    width,
    height,
    -283,
    -283,
    width * 0.5,
    height * 0.5,
  );
  context.restore();
}
pansIcon1.onload = function () {
  flag++;
  draw();
};
img.onload = function (e) {
  flag++;
  draw();
};

function drawBg() {
  context.save();

  const width = bg.width,
    height = bg.height;
  const xRatio = 698 / bg.width,
    yRatio = 698 / bg.height;
  console.log(xRatio, yRatio, width * xRatio, height * yRatio);
  context.drawImage(
    bg,
    0,
    0,
    width,
    height,
    0,
    0,
    width * xRatio,
    height * yRatio,
  );
  context.restore();
}

function drawPans1() {
  context.save();
  // context.translate(0, 0);

  const width = pansIcon1.width,
    height = pansIcon1.height;
  const xRatio = 80 / width,
    yRatio = 80 / height;
  context.translate(canvas.width / 2, canvas.height / 2);

  context.translate(0, -140);
  console.log(xRatio, yRatio, width * xRatio, height * yRatio);
  context.drawImage(
    pansIcon1,
    0,
    0,
    width,
    height,
    -40,
    -40,
    width,
    height,
  );
  context.restore();
}

function draw() {
  if (flag === 3) {
    drawBg();
    drawContent();
    drawPans1();
  }
}

bg.onload = function () {
  flag++;
  draw();
};
