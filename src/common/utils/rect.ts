export default function rect(
  context: CanvasRenderingContext2D,
  option: { x: number; y: number; width: number; height: number },
  counterClockWise = false,
) {
  const { x, y, width, height } = option;
  // context.beginPath()
  if (counterClockWise) {
    context.moveTo(x, y);
    context.lineTo(x, y + height);
    context.lineTo(x + width, y + height);
    context.lineTo(x + width, y);
  } else {
    context.rect(x, y, width, height);
  }
  context.closePath()
}
