export function getCanvasBase(): {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
} {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement,
    context = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 800;
  return {
    canvas,
    context,
  };
}

export function drawArrow(context: CanvasRenderingContext2D) {
  context.beginPath();
  context.moveTo(100, 350);
  context.lineTo(500, 350);
  context.lineTo(500, 200);
  context.lineTo(700, 400);
  context.lineTo(500, 600);
  context.lineTo(500, 450);
  context.lineTo(100, 450);
  context.lineTo(100, 350); // 有了closePath可以省略
  context.lineWidth = 10;
  context.fillStyle = "yellow";
  context.closePath(); // 形成一个封闭图形

  context.fill(); // 有填充色 需要先填充后stroke，不然描边颜色会被覆盖
  context.stroke();
}

export function drawRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  borderWidth: number,
  borderColor: string,
  fillColor: string
) {
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + width, y);
  context.lineTo(x + width, y + height);
  context.lineTo(x, y + height);
  context.closePath();

  context.strokeStyle = borderColor;
  context.lineWidth = borderWidth;
  context.fillStyle = fillColor;

  context.fill();
  context.stroke();
}
