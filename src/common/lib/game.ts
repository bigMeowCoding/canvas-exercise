import { IFunc, INone } from "../../typing/base";
import WeimobGame from "../weimobGame";

interface IEvent {
  type: string;
  listener: IFunc;
  node: StageNode;
}

class WGameContext {
  public ctx: CanvasRenderingContext2D | INone;
  public canvas: HTMLCanvasElement | INone;
  public stage: StageNode | INone;
  private weimobGame: WeimobGame;
  private events: IEvent[] = [];
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
    console.log("init");

    ctx?.scale(1, 1);
    this.ctx = ctx;
    this.canvas = canvas;
    this.stage = this.contain();
    this.addEventListener();
  }

  addEventListener() {
    this.canvas?.addEventListener("touchend", this.getListener.bind(this));
  }

  private getListener(e: TouchEvent) {
    console.log(e.type, e);

    const bl = this.canvas
      ? this.canvas?.width / this.canvas.getBoundingClientRect().width
      : 0;
    const a = {
      l: this.canvas
        ? this.canvas.getBoundingClientRect().left + window.scrollX
        : 0,
      t: this.canvas
        ? this.canvas.getBoundingClientRect().top + window.scrollY
        : 0,
    };
    const _x = (e.changedTouches[0].pageX - a.l) * bl;
    const _y = (e.changedTouches[0].pageY - a.t) * bl;
    this.events = this.events.map((event) => {
      if (e.type === event.type) {
        event.node._event = {
          x: _x,
          y: _y,
          listener: event.listener,
        };
        return event;
      } else {
        return event;
      }
    });
    console.log("cc");
  }

  removeListener() {
    this.canvas?.removeEventListener("touchend", this.getListener);
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

    this.ctx.translate(stageNode.x, stageNode.y);
    if (stageNode.rotate == undefined) stageNode.rotate = 0;
    const r = (stageNode.rotate * Math.PI) / 180;
    this.ctx.rotate(r);
    const childs = stageNode.childs as StageNode[];
    for (let i = 0; i < childs.length; i++) {
      const child = childs[i];
      if (child.type == INodeType.image) {
        this.drawImage(child as StageImageNode);
      } else if (child.type === INodeType.text) {
        this.drawText(child as StageTextNode);
      } else {
        this.showPage(child);
      }
    }
    this.ctx.restore();
  }
  contain() {
    const stageNode = new StageNode(INodeType.cons);

    return stageNode;
  }
  addEventListenerByNode(
    type: string,
    cb: IFunc,
    stageNode: StageNode,
    option: {
      x: number;
      y: number;
      r: number;
    },
  ) {
    stageNode._eventOption = option;
    this.events.push({
      type,
      listener: cb,
      node: stageNode,
    });
  }
  createImage(
    img: HTMLImageElement,
    x: number,
    y: number,
    sx: number,
    sy?: number,
    regX?: number,
    regY?: number,
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
    const imageNode = new StageImageNode(
      img,
      { x, y },
      {
        x: regX ?? img.width / 2,
        y: regY ?? img.height / 2,
      },
      { x: sx, y: sy },
    );
    return imageNode;
  }
  createText(text: string, x: number, y: number) {
    // var bg=scg.createImage2(myImg.base,375,547,750);
    // const mythis.weimobGame.myImages
    return new StageTextNode(text, { x, y });
  }
  private validateEvent(stageNode: StageImageNode) {
    if (!this.ctx) {
      return;
    }

    const sx = stageNode._eventOption;
    const _event = stageNode._event;
    if (!sx || !_event) {
      return;
    }
    this.ctx.beginPath();
    this.ctx.moveTo(sx.x + sx.r, sx.y);
    this.ctx.arc(sx.x, sx.y, sx.r, 0, 2 * Math.PI);
    this.ctx.closePath();
    if (this.ctx.isPointInPath(_event.x, _event.y)) {
      _event.listener({ x: _event.x, y: _event.y });
    }

    this.ctx.restore();
    stageNode._event = undefined;
  }
  private drawImage(stageNode: StageImageNode) {
    if (!this.ctx) {
      return;
    }

    this.ctx.save();
    // pushMask(mc);
    const w = stageNode.scaleX * stageNode.img.width;
    const h = stageNode.img.height * stageNode.scaleY;
    const rx = stageNode.regX * stageNode.scaleX;
    const ry = stageNode.regY * stageNode.scaleY;
    var r = (stageNode.rotate * Math.PI) / 180;
    this.ctx.translate(stageNode.x, stageNode.y);
    this.ctx.rotate(r);

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

    this.validateEvent(stageNode);
    this.ctx.restore();
  }

  private drawText(child: StageTextNode) {
    if (!this.ctx) {
      return;
    }

    this.ctx.save();

    this.ctx.font = "24px Microsoft Yahei";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.rotate(0);
    this.ctx.fillText(child.text, child.x, child.y);
    this.ctx.restore();
  }
}

export default WGameContext;
export enum INodeType {
  cons,
  image,
  text,
}

export class StageNode {
  public childs: StageNode[] = [];
  private alpha: number;
  public x: number;
  public y: number;
  public _eventOption:
    | {
        x: number;
        y: number;
        r: number;
      }
    | INone;
  public _event: { x: number; y: number; listener: IFunc } | INone;
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
export class StageTextNode extends StageNode {
  public text: string;
  constructor(text: string, pos: { x: number; y: number }) {
    super(INodeType.text);
    this.text = text;
    this.x = pos.x;
    this.y = pos.y;
  }
}
