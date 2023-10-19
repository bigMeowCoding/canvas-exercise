import loadImage from "./common/utils/loadImage";

const canvas = document.getElementById("canvas") as HTMLCanvasElement,
  context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
let drawImageEl: HTMLImageElement;
const startPos = {
  x: 0,
  y: 0,
};
let dragging = false;
const rubberDiv = document.getElementById("rubberbandDiv");
const resetBtn = document.getElementById("resetButton");
resetBtn?.addEventListener(
  "mouseup",
  (e) => {
    context?.clearRect(0, 0, canvas.width, canvas.height);
    context?.drawImage(drawImageEl, 0, 0);
    e.preventDefault();
    e.stopPropagation();
  },
  false,
);
const rubberStyle = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};
async function drawImage() {
  const image = await loadImage("/src/static/images/arch.png");
  drawImageEl = image;
  context?.drawImage(image, 0, 0);
}

drawImage();

function showRubberDiv() {
  if (!rubberDiv) {
    return;
  }
  rubberDiv.style.display = "block";
}
function hideRubberDiv() {
  if (!rubberDiv) {
    return;
  }
  rubberDiv.style.display = "none";
}

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
canvas.onmousedown = (e) => {
  const { clientY, clientX } = e;
  startPos.x = clientX;
  startPos.y = clientY;
  rubberStyle.left = clientX;
  rubberStyle.top = clientY;
  showRubberDiv();
  moveRubberDiv();
  dragging = true;
  e.preventDefault();
};
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

  rubberStyle.width = width;
  rubberStyle.height = height;
  moveRubberDiv();
  resizeRubberDiv();
  e.preventDefault();
};

window.addEventListener(
  "mouseup",
  (e) => {
    dragging = false;
    hideRubberDiv();

    const canvasRectangle = canvas.getBoundingClientRect();

    const { left, top } = canvasRectangle;

    const clipLeft = rubberStyle.left - left;
    const clipTop = rubberStyle.top - top;
    console.log(rubberStyle.left, rubberStyle.top, left, top);
    console.log(
      drawImageEl,
      left,
      top,
      canvasRectangle.width,
      canvasRectangle.height,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    context?.drawImage(
      drawImageEl,
      clipLeft,
      clipTop,
      rubberStyle.width,
      rubberStyle.height,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    e.preventDefault();
  },
  false,
);
