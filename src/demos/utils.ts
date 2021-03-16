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
