import WGameContext from "./lib/game";
import loadImages from "./utils/loadImages";

export interface IWeimobGame {
  name: string;
  onCompleteHandle: () => void;
  onLoadingHandle: (d: number) => void;
  id: string;
  theme: string;
  data: { name: string; label?: string; src: string }[];
}

class WeimobGame {
  private scg: WGameContext | null = null;
  private name: string = "";
  private myImages: { [key: string]: HTMLImageElement } = {};
  private data: { name: string; label?: string; src: string }[] = [];
  private option: IWeimobGame | null = null;
  constructor() {}

  init(option: IWeimobGame) {
    this.name = option.name;
    this.data = option.data;
    this.option = option;
    this.loadGameScript().then(()=> {
      this.loadMaterial();
    });

  }

  private async loadGameScript() {
    const loadingHandle = this.option?.onLoadingHandle;
    const scg = await import("./lib/game");

    this.scg = new scg.default();
    this.scg.init();
    loadingHandle?.(5);
    const Game = await import(`./games/${this.name}/index.ts`);
    new Game.default();
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
