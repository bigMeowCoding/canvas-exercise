import WeimobGame from "../../weimobGame";
import WGameContext from "../../lib/game";

class Egg {
  private weimobGame: WeimobGame;
  private scg: WGameContext;
  constructor(weimobGame: WeimobGame) {
    this.weimobGame = weimobGame;
    this.scg = this.weimobGame.scg as WGameContext;
  }
  init() {
    const option = this.weimobGame.getOption();

    this.scg.init(option.id, { width: 750, height: 750 });
    const stage = this.scg.stage;

  }
}
export default Egg;
