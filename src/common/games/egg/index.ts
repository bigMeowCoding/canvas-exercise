import WeimobGame from "../../weimobGame";

class Egg {
  private weimobGame: WeimobGame;
  constructor(ctx: WeimobGame) {
    this.weimobGame = ctx;
  }
  init() {
    const option = this.weimobGame.getOption();

    this.weimobGame.scg?.init(option.id, { width: 750, height: 750 });
  }
}
export default Egg;
