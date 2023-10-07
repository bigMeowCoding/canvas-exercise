import WGameContext from "./lib/game";
import loadImages from "./utils/loadImages";

export interface IWeimobGame {
  name: string;
  onCompleteHandle: () => void;
  onLoadingHandle: (d: number) => void;
  id: string;
  theme: string;
  width?: number;
  height?: number;
  data: { name: string; label?: string; src: string }[];
}

class WeimobGame {
  public scg: WGameContext | null = null;
  public myImages: { [key: string]: HTMLImageElement } = {};
  private data: { name: string; label?: string; src: string }[] = [];
  private option: IWeimobGame | null = null;
  public game: any; // TODO
  constructor() {}

  init(option: IWeimobGame) {
    this.data = option.data;
    this.option = option;
    this.loadGameScript().then(() => {
      this.loadMaterial();
    });
  }
  public getOption() {
    return this.option as IWeimobGame; // TODO
  }
  private async loadGameScript() {
    const _this = this;
    const loadingHandle = this.option?.onLoadingHandle;
    const scg = await import("./lib/game");
    const option = this.getOption();
    this.scg = new scg.default(this);
    loadingHandle?.(5);
    const name = this.option?.name ?? "";
    const Game = await import(`./games/${name}/index.ts`);
    this.game = new Game.default(this);
    loadingHandle?.(10);
  }

  private async loadMaterial() {
    const loadingHandle = this.option?.onLoadingHandle;
    const onCompleteHandle = this.option?.onCompleteHandle;
    const len = this.data.length;
    let count = 0;
    const images = await loadImages(
      this.data.map((item) => item.src),
      {
        onLoaded: () => {
          loadingHandle?.(100);
          onCompleteHandle?.();
        },
        onLoading: () => {
          count++;
          loadingHandle?.(10 + (count / len) * 90);
        },
      },
    );

    for (let i = 0; i < this.data.length; i++) {
      this.myImages[this.data[i].name] = images[i];
    }
  }
}

export default WeimobGame;
