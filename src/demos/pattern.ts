import { getCanvasBase } from "./utils";
import yongerJpg from "./yonger.jpg";
export function fillCanvasWithPattern(repetition: string) {
  const { context, canvas } = getCanvasBase();
  if (!context) {
    return;
  }
  const image = new Image();
  image.src = yongerJpg;
  context.clearRect(0, 0, canvas.width, canvas.height);
  image.onload = function () {
    const pattern = context.createPattern(image, repetition);
    if (!pattern) {
      return;
    }
    context.fillStyle = pattern;
    context.fillRect(0, 0, canvas.width, canvas.height);
  };
}

export function radioListen() {
  const radioList = document.getElementsByClassName("repeat-radio");
  if (radioList.length) {
    const arr = Array.from(radioList);
    arr.forEach((item) => {
      item.addEventListener("click", (e) => {
        const target = e.target as Element;
        fillCanvasWithPattern(target.getAttribute("value") || "");
      });
    });
  }
}
