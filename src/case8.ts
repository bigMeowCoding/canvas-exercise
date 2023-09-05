import loadImages from "./common/loadImages";

/**
 * @description createImage demo test
 */
const canvas = document.getElementById("canvas") as HTMLCanvasElement,
  context = canvas.getContext("2d");
context.font = "24px Microsoft Yahei";
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
// pansIcon1.onload = function () {
//   flag++;
//   draw();
// };
// img.onload = function (e) {
//   flag++;
//   draw();
// };

function drawImage(
  img: HTMLImageElement,
  x: number,
  y: number,
  xRatio: number,
  yRatio: number,
  delX: number,
  delY: number,
) {
  context.save();

  const width = img.width,
    height = img.height;
  // const xRatio = 698 / bg.width,
  //   yRatio = 698 / bg.height;
  context.translate(x, y);
  console.log(xRatio, yRatio, width * xRatio, height * yRatio);
  context.drawImage(
    img,
    0,
    0,
    width,
    height,
    -1 * delX * xRatio,
    -1 * delY * yRatio,
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
  context.drawImage(pansIcon1, 0, 0, width, height, -40, -40, width, height);
  context.restore();
}

function drawText(text: string, x: number, y: number) {
  context.save();
  context.fillText(text, x, y);
  context.restore();
}

async function draw(ele: any) {
  // if (flag === 3) {
  //   drawBg();
  //   drawContent();
  //   drawPans1();
  //   drawPans1Text();
  // }
  if (ele.children) {
    for (const child of ele.children) {
      context.save();
      context.translate(ele.x, ele.y);
      if (ele.rotate) {
        context.rotate(ele.rotate);
      }
      draw(child);
      context.restore();
    }
  } else if (ele.type === "image") {
    drawImage(
      ele.img,
      ele.x,
      ele.y,
      ele.xRatio,
      ele.yRatio,
      ele.delX,
      ele.delY,
    );
  } else if (ele.type === "text") {
    drawText(ele.text, ele.x, ele.y);
  }
}
async function start() {
  const imgs = await loadImages([
    "https://image-c.weimobwmc.com/ol-6LEtw/5b3b2f175218476695bbe7e89abc63c9.png",
    "https://image-c.weimobwmc.com/ol-6LEtw/04f03ec2becc4135a1d5246dc8503243.png",
    "https://image-c.weimobwmc.com/ol-6LEtw/eb9f643802a84bf1a27529539a9c34a7.png",
    "https://image-c.weimobwmc.com/ol-6LEtw/eb9f643802a84bf1a27529539a9c34a7.png",
    "https://image-c.weimobwmc.com/ol-6LEtw/eb9f643802a84bf1a27529539a9c34a7.png",
    "https://image-c.weimobwmc.com/ol-6LEtw/eb9f643802a84bf1a27529539a9c34a7.png",
    "https://image-c.weimobwmc.com/ol-6LEtw/eb9f643802a84bf1a27529539a9c34a7.png",
    "https://image-c.weimobwmc.com/ol-6LEtw/eb9f643802a84bf1a27529539a9c34a7.png",
    "https://image-c.weimobwmc.com/ol-6LEtw/eb9f643802a84bf1a27529539a9c34a7.png",
    "https://image-c.weimobwmc.com/ol-6LEtw/eb9f643802a84bf1a27529539a9c34a7.png",
    "https://preview.qiantucdn.com/58pic/21/44/93/07f58PICfpfv8dkbiGkaB_PIC2018.jpg%21w1024_new_small",
  ]);
  // var btn=new scg.createImage(myImg.btn_start,pans.x,pans.y,myImg.btn_start.width/2,myImg.btn_start.height/2,268/myImg.btn_start.width,268/myImg.btn_start.height);

  const stage = {
    x: 0,
    y: 0,
    children: [
      {
        type: "image",
        img: imgs[0],
        x: 0,
        y: 0,
        xRatio: 698 / imgs[0].width,
        yRatio: 698 / imgs[0].height,
        delX: 0,
        delY: 0,
      },
      {
        x: canvas.width / 2,
        y: canvas.height / 2,
        children: [
          {
            type: "image",
            img: imgs[1],
            x: 0,
            y: 0,
            xRatio: 566 / imgs[1].width,
            yRatio: 566 / imgs[1].height,
            delX: imgs[1].width / 2,
            delY: imgs[1].height / 2,
          },
          ...makePanList(imgs),
        ],
      },
      {
        type: "image",
        img: imgs[imgs.length-1],
        x: canvas.width / 2,
        y: canvas.height / 2,
        xRatio: 50 / imgs[imgs.length-1].width,
        yRatio: 50 / imgs[imgs.length-1].height,
        delX:  imgs[imgs.length-1].width/2,
        delY: imgs[imgs.length-1].height/2,
      },
    ],
  };
  draw(stage);
}
start();
// bg.onload = function () {
//   flag++;
//   draw();
// };
function makePanList(imgs: HTMLImageElement[]) {
  const pans = [];
  for (let i = 0; i < 8; i++) {
    pans.push({
      // x: canvas.width / 2,
      // y: canvas.height / 2,
      rotate: (((i * 360) / 8) * Math.PI) / 180,
      children: [
        {
          type: "image",
          img: imgs[i + 2],
          x: 0,
          y: -140,
          xRatio: 80 / imgs[i + 2].width,
          yRatio: 80 / imgs[i + 2].height,
          delX: 40,
          delY: 40,
        },
        {
          type: "text",
          x: 0,
          y: -235,
          text: i + 1,
        },
      ],
    });
  }
  return pans;
}
