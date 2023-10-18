import WeimobGame from "../../weimobGame";
import WGameContext, { INodeType, StageNode } from "../../lib/game";

class Bighweel {
  private weimobGame: WeimobGame;
  private scg: WGameContext;
  constructor(weimobGame: WeimobGame) {
    this.weimobGame = weimobGame;
    this.scg = this.weimobGame.scg as WGameContext;
  }
  init() {
    const option = this.weimobGame.getOption();

    this.scg.init(option.id, { width: 698, height: 698 });

    const stage = this.scg.stage;
    if (!stage) {
      return;
    }
    this.addBg(stage);
    const pans = new StageNode(INodeType.cons);
    pans.x = this.scg.canvas.width / 2;
    pans.y = this.scg.canvas.height / 2;
    const imgWidth = this.weimobGame.myImages.bg2.width;
    const imgHeight = this.weimobGame.myImages.bg2.height;
    const scaleX = 566 / imgWidth;
    const scaleY = 566 / imgHeight;
    const bg2 = this.scg.createImage(
      this.weimobGame.myImages.bg2,
      0,
      0,
      566,
      566,
      this.weimobGame.myImages.bg2.width / 2,
      this.weimobGame.myImages.bg2.height / 2,
    );
    pans.addChild(bg2);
    for (let i = 0; i < 8; i++) {
      const pan = new StageNode(INodeType.cons);
      const img = this.weimobGame.myImages["p" + i];
      const ratio =
        80 / img.width < 80 / img.height ? 80 / img.width : 80 / img.height;
      const icon = this.scg.createImage(
        img,
        -0,
        -140,
        80,
        80,
        img.width / 2,
        img.height / 2,
      );
      pan.rotate = (i * 360) / 8;
      const text = this.scg.createText(i + "", 0, -235);
      pan.addChild(icon);
      pan.addChild(text);
      pans.addChild(pan);
    }
    stage.addChild(pans);
    const btn = this.scg.createImage(
      this.weimobGame.myImages["btn_start"],
      pans.x,
      pans.y,
      268,
      268,
      this.weimobGame.myImages["btn_start"].width / 2,
      this.weimobGame.myImages["btn_start"].height / 2,
    );
    stage.addChild(btn);
    this.scg.openRepick();
    console.log(stage, "stage");
  }

  private addBg(stage: StageNode) {
    const bg = this.scg.createImage(
      this.weimobGame.myImages.bg,
      0,
      0,
      698,
      698,
      0,
      0,
    );
    stage?.addChild(bg);
  }
}
export default Bighweel;
