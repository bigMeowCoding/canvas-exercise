import "./index.scss";

const canvas = document.getElementById("canvas");

const context = (canvas as HTMLCanvasElement).getContext("2d");

if (context && canvas) {
  context.font = "38px Arial";
  context.fillStyle = "cornflowerblue";
  context.strokeStyle = "blue";
  context.fillText(
    "hello canvas",
    canvas.clientWidth / 2 - 150,
    canvas.clientHeight / 2 + 15
  );
  context.strokeText(
    "hello canvas",
    canvas.clientWidth / 2 - 150,
    canvas.clientHeight / 2 + 15
  );
}
