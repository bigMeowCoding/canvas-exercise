import { getCanvasBase } from "./utils";

export function search() {
  const { context, canvas } = getCanvasBase(),
    searchLight: {
      radius: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
    } = {
      radius: 150,
      x: canvas.width / 2,
      vx: 20,
      vy: 20,
      y: canvas.height / 2,
    };
  if (!context) {
    return;
  }
  function update() {
    searchLight.x = searchLight.x + searchLight.vx;
    searchLight.y = searchLight.y + searchLight.vy;
    // if (searchLight.x - searchLight.radius <= 0) {
    //   searchLight.x = searchLight.radius;
    // }
    // if (searchLight.x + searchLight.radius >= canvas.width) {
    //   searchLight.x = canvas.width - searchLight.radius;
    // }
    // if (searchLight.y - searchLight.radius <= 0) {
    //   searchLight.y = searchLight.radius;
    // }
    // if (searchLight.y + searchLight.radius >= canvas.height) {
    //   searchLight.y = canvas.height - searchLight.radius;
    // }
    searchLight.vx =
      searchLight.x + searchLight.radius >= canvas.width ||
      searchLight.x - searchLight.radius <= 0
        ? -searchLight.vx
        : searchLight.vx;
    searchLight.vy =
      searchLight.y - searchLight.radius <= 0 ||
      searchLight.y + searchLight.radius >= canvas.height
        ? -searchLight.vy
        : searchLight.vy;
  }
  function draw(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    context.beginPath();
    context.arc(
      searchLight.x,
      searchLight.y,
      searchLight.radius,
      0,
      Math.PI * 2
    );
    context.fillStyle = "white";
    context.fill();
    context.clip();

    context.beginPath();
    context.font = "bold 150px Arial";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillStyle = "#058";
    context.fillText("canvas", canvas.width / 2, canvas.height / 2);
    context.restore();
  }

  setInterval(() => {
    draw(context);
    update();
  }, 50);
}
