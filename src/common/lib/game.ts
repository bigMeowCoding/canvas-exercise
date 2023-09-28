import { INone } from "../../typing/base";

class WGameContext {
  private scg: WGameContext | null = null;
  private ctx: CanvasRenderingContext2D | INone;
  private canvas: HTMLCanvasElement | INone;

  constructor() {}
  init(
    id: string,
    option: {
      width: number;
      height: number;
    },
  ) {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    if (!canvas) {
      console.warn("canvas 为null");
      return;
    }
    const { width, height } = option;
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    ctx?.scale(1, 1);
    this.ctx = ctx;
    this.canvas = canvas;
    console.log("initContext222");
  }
}

export default WGameContext;
