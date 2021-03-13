const RADIUS = 200;

export function drawClock() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.height = 800;
  canvas.width = 800;
  if (!canvas) {
    return;
  }
  const context = (canvas as HTMLCanvasElement).getContext("2d");
  if (!context) {
    return;
  }
  drawCirCle(context, canvas);
  const numerals = [1, 2, 3];
  numerals.forEach((num, index) => {
    context.fillText(
      num + "",
      canvas.width / 2 +
        Math.cos(Math.PI / 2 - (index + 1) * ((Math.PI / 2) / 3)) * RADIUS,
      canvas.height / 2 -
        Math.sin(Math.PI / 2 - (index + 1) * ((Math.PI / 2) / 3)) * RADIUS
    );
  });
}

function drawCirCle(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  context.beginPath();
  context.arc(
    canvas.width / 2,
    canvas.height / 2,
    RADIUS,
    0,
    Math.PI * 2,
    true
  );
  context.stroke();
}
