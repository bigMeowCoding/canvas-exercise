import { INone } from "../../typing/base";
import WeimobGame from "../weimobGame";

class WGameContext {
  private ctx: CanvasRenderingContext2D | INone;
  private canvas: HTMLCanvasElement | INone;
  public stage: StageNode | INone;
  private weimobGame: WeimobGame;
  constructor(wGame: WeimobGame) {
    this.weimobGame = wGame;
  }
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
    this.stage = this.contain();
    console.log("initContext222");
  }
  contain() {
    return new StageNode(INodeType.cons);
  }
  createImage(
    img: HTMLImageElement,
    x: number,
    y: number,
    sx: number,
    sy?: number,
  ) {
    if (sy == undefined) {
      sy = sx / img.width;
      sx = sy;
    } else if (sx == undefined) {
      sy = sy / img.height;
      sx = sy;
    } else {
      sx = sx / img.width;
      sy = sy / img.height;
    }
    // var bg=scg.createImage2(myImg.base,375,547,750);
    // const mythis.weimobGame.myImages
    return new StageImageNode(
      img,
      { x, y },
      {
        x: img.width / 2,
        y: img.height / 2,
      },
      { x: sx, y: sy },
    );
  }
}

export default WGameContext;
export enum INodeType {
  cons,
  image,
}
class StageNode {
  private childs: StageNode[] = [];
  private alpha: number;
  public x: number;
  public y: number;
  public rotate: number;
  constructor(private type: INodeType) {
    this.type = type;
    this.childs = [];
    this.x = 0;
    this.y = 0;
    this.rotate = 0;
    this.alpha = 1;
  }
  addChild(node: StageNode) {
    this.childs.push(node);
  }
}
class StageImageNode extends StageNode {
  private img: HTMLImageElement;
  private regX: any;
  private regY: number;
  private scaleX: number;
  private scaleY: number;
  constructor(
    img: HTMLImageElement,
    pos: { x: number; y: number },
    reg: { x: number; y: number },
    scale: { x: number; y: number },
  ) {
    super(INodeType.image);
    this.img = img;
    this.x = pos.x;
    this.y = pos.y;
    this.regX = reg.x ?? 0;
    this.regY = reg.y ?? 0;
    this.scaleX = scale.x ?? 1;
    this.scaleY = scale.y ?? 1;
  }
}
