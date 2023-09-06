import loadImages from "./common/loadImages";
import getRandomInt from "./common/getRandomInt";

/**
 * @description createImage demo test
 */
const canvas = document.getElementById("canvas") as HTMLCanvasElement,
  context = canvas.getContext("2d") as CanvasRenderingContext2D;

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

const pans1Src =
  "https://image-c.weimobwmc.com/ol-6LEtw/eb9f643802a84bf1a27529539a9c34a7.png";

pansIcon1.src = pans1Src;

let stage = {};
const events: any[] = [];
const repickFuns: any[] = [];

function drawImage(
  img: HTMLImageElement,
  x: number,
  y: number,
  xRatio: number,
  yRatio: number,
  delX: number,
  delY: number,
  eventListener: any,
) {
  context.save();

  const width = img.width,
    height = img.height;
  // const xRatio = 698 / bg.width,
  //   yRatio = 698 / bg.height;
  context.translate(x, y);
  context.beginPath();
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
  context.beginPath();
  context.rect(
    -1 * delX * xRatio,
    -1 * delY * yRatio,
    width * xRatio,
    height * yRatio,
  );

  context.closePath();
  if (
    eventListener &&
    context.isPointInPath(eventListener.eventX, eventListener.eventY)
  ) {
    eventListener.cb();
    eventListener.eventX = null;
    eventListener.eventY = null;
  }

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
      ele.eventListener,
    );
    if (ele.eventListener) {
      const findIndex = events.findIndex((item) => {
        return item.ele === ele && item.type === ele.eventListener.type;
      });
      if (findIndex === -1) {
        events.push({
          type: ele.eventListener.type,
          ele,
          cb: ele.eventListener.cb,
        });
      }
    }
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

  function makeStage() {
    let pansRotate = 0;
    return {
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
          rotate: pansRotate,
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
          img: imgs[imgs.length - 1],
          x: canvas.width / 2,
          y: canvas.height / 2,
          xRatio: 50 / imgs[imgs.length - 1].width,
          yRatio: 50 / imgs[imgs.length - 1].height,
          eventListener: {
            type: "touchstart",
            cb: () => {
              let now = 0;
              const index = getRandomInt(1, 8);
              var over = (((8 - index) * 360) / 8) % 360;
              console.log("play=======", index);

              var maxdu = 20;
              var mindu = 1;
              var jsdu = -0.1;
              var sudu = 0;
              var js_t = (mindu - maxdu) / jsdu;
              var js_all = maxdu * js_t + 0.5 * jsdu * js_t * js_t;
              js_all = (js_all - over) % 360;
              js_all = (360 - js_all) % 360;

              var jadu = 0.3;
              var jia = -1;

              const repickFun = function () {
                console.log("repick", jia, sudu, now, over, js_all);
                if (jia == -1) sudu += jadu;
                if (jia == -1 && sudu > maxdu) {
                  sudu = maxdu;
                  jia = 0;
                }
                if (jia == 1) {
                  sudu += jsdu;
                }
                if (jia == 1 && sudu < mindu) sudu = mindu;
                now += sudu;
                if (jia == 0) {
                  if (now - js_all <= maxdu) {
                    jia = 1;
                    now = js_all;
                  }
                }
                now = now % 360;
                pansRotate = now;
                stage.children[1].rotate = (pansRotate * Math.PI) / 180;
                if (sudu == mindu && Math.round(now - over) == 0) {
                  repickFuns.splice(0, repickFuns.length);
                }
              };
              repickFuns.push(repickFun);
            },
          },
          delX: imgs[imgs.length - 1].width / 2,
          delY: imgs[imgs.length - 1].height / 2,
        },
      ],
    };
  }

  stage = makeStage();
  canvas.addEventListener("touchstart", (e) => {
    const eventListener = events.filter((item) => {
      return item.type === e.type;
    })[0];
    const bl = canvas.width / canvas.getBoundingClientRect().width;
    const a = {
      l: canvas.getBoundingClientRect().left + window.scrollX,
      t: canvas.getBoundingClientRect().top + window.scrollY,
    };
    const x = (e.changedTouches[0].pageX - a.l) * bl;
    const y = (e.changedTouches[0].pageY - a.t) * bl;
    if (eventListener) {
      eventListener.ele.eventListener.eventX = x;
      eventListener.ele.eventListener.eventY = y;
    }
  });
  drawStage();
}

function drawStage() {
  draw(stage);
  repickFuns.forEach((func) => func());
  requestAnimationFrame(() => {
    drawStage();
  });
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
