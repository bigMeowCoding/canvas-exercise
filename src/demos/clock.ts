const RADIUS = 200;

function drawNumerals(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  const numerals = Array.from(new Array(12)).map((item, index) => {
    return index + 1;
  });
  numerals.forEach((num, index) => {
    context.fillText(
      num + "",
      canvas.width / 2 +
        Math.cos(Math.PI / 2 - (index + 1) * (Math.PI / 2 / 3)) * (RADIUS + 20),
      canvas.height / 2 -
        Math.sin(Math.PI / 2 - (index + 1) * (Math.PI / 2 / 3)) * (RADIUS + 20)
    );
  });
}

function drawPointer(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  const date = new Date(),
    minutes = date.getMinutes(),
    second = date.getSeconds();
  let hour = date.getHours();
  hour = hour > 12 ? hour - 12 : hour;
  console.log(second);
  _drawClock(context, canvas, hour * 5, true);
  _drawClock(context, canvas, minutes);
  _drawClock(context, canvas, second);
}

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
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCirCle(context, canvas);
  drawNumerals(context, canvas);
  drawPointer(context, canvas);
}

function _drawClock(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  times: number,
  isHour: boolean = false
) {
  const minus = 43,
    radius = isHour ? RADIUS - minus * 2 : RADIUS - minus;
  context.moveTo(canvas.width / 2, canvas.height / 2);
  context.lineTo(
    canvas.width / 2 +
      Math.cos(Math.PI / 2 - (Math.PI * 2 * times) / 60) * radius,
    canvas.height / 2 -
      Math.sin(Math.PI / 2 - (Math.PI * 2 * times) / 60) * radius
  );
  context.stroke();
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
