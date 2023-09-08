import loadImage from "./common/loadImage";

const canvas = document.getElementById("canvas") as HTMLCanvasElement,
  context = canvas.getContext("2d");

const startPos = {
  x: 0,
  y: 0,
};
let dragging = false;
const rubberDiv = document.getElementById("rubberbandDiv");

const rubberStyle = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};
async function drawImage() {
  const image = await loadImage("/src/static/images/arch.png");
  context?.drawImage(image, 0, 0);
}

drawImage();

function showRubberDiv() {
  if (!rubberDiv) {
    return;
  }
  rubberDiv.style.display = "block";
}

window.onmousedown = (e) => {
  const { clientY, clientX } = e;
  startPos.x = clientX;
  startPos.y = clientY;
  rubberStyle.left = clientX;
  rubberStyle.top = clientY;
  showRubberDiv();
  moveRubberDiv();
  dragging=true
  console.log('mousedown======')
};

function moveRubberDiv() {
  if (!rubberDiv) {
    return;
  }
  rubberDiv.style.left = rubberStyle.left + "px";
  rubberDiv.style.top = rubberStyle.top + "px";
}

function resizeRubberDiv() {
  if (!rubberDiv) {
    return;
  }
  rubberDiv.style.width = rubberStyle.width + "px";
  rubberDiv.style.height = rubberStyle.height + "px";
}

window.onmousemove = (e) => {
  if (!dragging) {
    return;
  }
  const { clientY, clientX } = e;
  const { x, y } = startPos;
  let left = 0,
    top = 0;
  if (clientX < x) {
    left = clientX;
  } else {
    left = x;
  }
  top = clientY < y ? clientY : y;
  rubberStyle.top = top;
  rubberStyle.left = left;
  let width = 0,
    height = 0;
  width = Math.abs(clientX - x);
  height = Math.abs(clientY - y);
  console.log("move===", width, height);

  rubberStyle.width = width;
  rubberStyle.height = height;
  moveRubberDiv();
  resizeRubberDiv();
};
window.onmouseup = () => {
  dragging=false
  console.log('mouseup====')
};
