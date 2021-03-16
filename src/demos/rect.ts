const canvas = document.getElementById("canvas") as HTMLCanvasElement,
  context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
export function drawRect() {
  if (!context) {
    return;
  }
  const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0,'blue');
  gradient.addColorStop(0.25, 'yellow');
  gradient.addColorStop(1,'red')
  context.fillStyle = gradient;
  context.lineJoin = "round";
  context.fillText("rect", 100, 100);
  context.strokeRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);
}
