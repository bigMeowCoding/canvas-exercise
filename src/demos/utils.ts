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

export function drawStar(
  context: CanvasRenderingContext2D,
  pos: { x: number; y: number; rot: number },
  radius: { inner: number; outer: number },
  style: {
    borderWidth?: number;
    borderStyle?: string;
    fillStyle?: string;
  }
) {
  context.beginPath();
  for (let i = 0; i < 5; i++) {
    context.lineTo(
      Math.cos(((18 - pos.rot + i * 72) * Math.PI) / 180) * radius.outer +
        pos.x,
      -1 * Math.sin(((18 - pos.rot + i * 72) * Math.PI) / 180) * radius.outer +
        pos.y
    );
    context.lineTo(
      Math.cos(((54 - pos.rot + i * 72) * Math.PI) / 180) * radius.inner +
        pos.x,
      -1 * Math.sin(((54 - pos.rot + i * 72) * Math.PI) / 180) * radius.inner +
        pos.y
    );
  }
  context.closePath();
  context.strokeStyle = style.borderStyle ?? "";
  context.lineWidth = style.borderWidth ?? 0;
  context.lineJoin = "round";
  context.fillStyle = style.fillStyle ?? "";

  context.fill();
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
  context.strokeStyle = borderColor;
  context.lineWidth = borderWidth;
  context.fillStyle = fillColor;
  // 不需要beginPath内部帮做了
  context.fillRect(x, y, width, height);
  context.strokeRect(x, y, width, height);
}
