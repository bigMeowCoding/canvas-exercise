import WGameContext from "./lib/game";

class WeimobGame {
  private name: string;
  private scg: WGameContext | null = null;
  constructor(option: { name: string }) {
    this.name = option.name;
  }

  init() {
    this.loadGameScript();
  }

  private async loadGameScript() {
    const scg = await import("./lib/game");
    this.scg = new scg.default();
    this.scg.init();

    const Game = await import(`./games/${this.name}/index.ts`);
    new Game.default();

    console.log();
  }
}

export default WeimobGame;
