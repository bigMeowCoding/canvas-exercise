/**
 * @description createImage demo test
 */
const canvas = document.getElementById("canvas") as HTMLCanvasElement,
  context = canvas.getContext("2d");
const img = new Image();
img.src = "/src/images/1.jpeg";
img.onload = function (e) {
  context.drawImage(img, 100, 100, 100, 100, 0, 0, 100, 100);
};
