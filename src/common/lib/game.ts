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
  openRepick() {
    this.frameWorkHandle();
  }
  frameWorkHandle() {
    // console.log("frameWorkHandle", this.stage);
    if (!this.ctx) {
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas?.width ?? 0, this.canvas?.height ?? 0);
    if (this.stage) {
      this.showPage(this.stage);
    }
    window.requestAnimationFrame(this.frameWorkHandle.bind(this));
  }
  showPage(stageNode: StageNode) {
    if (!this.ctx) {
      return;
    }
    this.ctx.save();
    // console.log(stageNode.childs[0]?.img, "stageNode.childs[0].img")
    // this.ctx.drawImage(
    //   stageNode.childs[0].img,
    //   0,
    //   0,
    //
    // );

    console.log(stageNode.x, stageNode.y, "stageNode.x, stageNode.y");
    this.ctx.translate(stageNode.x, stageNode.y);
    // this.ctx.translate(0,0)
    if (stageNode.type == INodeType.image) {
      this.drawImage(stageNode as StageImageNode);
    } else {
      const childs = stageNode.childs as StageNode[];
      for (let i = 0; i < childs.length; i++) {
        this.showPage(childs[i]);
      }
    }
    this.ctx.restore();
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

  private drawImage(stageNode: StageImageNode) {
    if (!this.ctx) {
      return;
    }

    this.ctx.save();
    // pushMask(mc);
    console.log(stageNode);
    const w = stageNode.scaleX * stageNode.img.width;
    const h = stageNode.img.height * stageNode.scaleY;
    const rx = stageNode.regX * stageNode.scaleX;
    const ry = stageNode.regY * stageNode.scaleY;
    // if (mc.rotate == undefined) mc.rotate = 0;
    // var r = (mc.rotate * Math.PI) / 180;
    // ctx.globalAlpha *= mc.alpha;
    // this.ctx.translate(stageNode.x, stageNode.y);
    // this.ctx.rotate(r);
    // if (mc.transform != undefined) {
    //   var a = mc.transform;
    //   ctx.transform(a[0], a[1], a[2], a[3], a[4], a[5]);
    // }
    // ctx.imageSmoothingEnabled = true;
    console.log(stageNode.img.width, stageNode.img.height, -rx, -ry, w, h);
    this.ctx.drawImage(
      stageNode.img,
      0,
      0,
      stageNode.img.width,
      stageNode.img.height,
      -rx,
      -ry,
      w,
      h,
    );
    // ctx.drawImage(mc.img, 0, 0, mc.img.width, mc.img.height, -rx, -ry, w, h);

    // addEvent(mc);
    this.ctx.restore();
  }
}

export default WGameContext;
export enum INodeType {
  cons,
  image,
}

class StageNode {
  public childs: StageNode[] = [];
  private alpha: number;
  public x: number;
  public y: number;
  public rotate: number;
  constructor(public type: INodeType) {
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
  public img: HTMLImageElement;
  public regX: any;
  public regY: number;
  public scaleX: number;
  public scaleY: number;
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
