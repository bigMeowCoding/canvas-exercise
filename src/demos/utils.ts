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

export function drawStarSky(count: number) {
  const { context, canvas } = getCanvasBase();
  if (!context) {
    return;
  }
  const skyStyle = context.createRadialGradient(
    canvas.width / 2,
    canvas.height,
    0,
    canvas.width / 2,
    canvas.height,
    canvas.height
  );
  skyStyle.addColorStop(0, "black");
  skyStyle.addColorStop(1.0, "#035");
  context.fillStyle = skyStyle;
  context.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < count; i++) {
    const rot = 360 * Math.random(),
      x = canvas.width * Math.random(),
      y = canvas.height * 0.65 * Math.random(),
      r = Math.random() * 10 + 10;
    drawStar(
      context,
      {
        x,
        y,
        rot,
      },
      { inner: r / 2, outer: r },
      { fillStyle: "yellow" }
    );
  }
}

function pathRoundRect(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  radius: number
) {
  context.beginPath();
  context.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
  context.lineTo(radius, height);
  context.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
  context.lineTo(0, radius);
  context.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);
  context.lineTo(width - radius, 0);
  context.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);
  context.closePath();
}

export function strokeRoundRect(
  context: CanvasRenderingContext2D,
  pos: { x: number; y: number },
  size: { width: number; height: number; radius: number },
  option?: {
    strokeStyle: string;
  }
) {
  context.save();
  context.translate(pos.x, pos.y);
  pathRoundRect(context, size.width, size.height, size.radius);
  context.strokeStyle = option?.strokeStyle ?? "black";
  context.stroke();
  context.restore();
}

export function fillRoundRect(
  context: CanvasRenderingContext2D,
  pos: { x: number; y: number },
  size: { width: number; height: number; radius: number },
  option?: {
    fillStyle: string;
  }
) {
  context.save();
  context.translate(pos.x, pos.y);
  pathRoundRect(context, size.width, size.height, size.radius);
  context.fillStyle = option?.fillStyle ?? "black";
  context.fill();
  context.restore();
}

export function fillMoon(
  ctx: CanvasRenderingContext2D,
  d: number,
  x: number,
  y: number,
  r: number,
  rot: number,
  fillColor?: string
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((rot * Math.PI) / 180);
  ctx.scale(r, r);
  pathMoon(ctx, d);
  ctx.fillStyle = fillColor || "#fb5";
  ctx.fill();
  ctx.restore();
}

export function pathMoon(ctx: CanvasRenderingContext2D, d: number) {
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0.5 * Math.PI, 1.5 * Math.PI, true);
  ctx.moveTo(0, -1);
  ctx.arcTo(d, 0, 0, 1, dis(0, -1, d, 0) / d);
  ctx.closePath();
}

function dis(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}
