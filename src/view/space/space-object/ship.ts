import { SpaceObject } from ".";
import { Board } from "../../board";

interface ShipConfig {
  id: string;
  board: Board;
}

export class Ship extends SpaceObject {
  private defaultSize = 40;
  private speed = 107.75;

  constructor(config: ShipConfig) {
    super({
      id: config.id,
      group: "shipes",
      x: config.board.getRandomWidth(),
      y: 0,
      size: 0,
      src: "/ship.svg",
      board: config.board,
    });
  }

  override init() {
    this.updateY(this.board.height - this.defaultSize);
    this.updateSize(this.defaultSize);
  }

  override update(deltaTime: number) {
    super.update(deltaTime);

    this.updateY(this.y - this.speed * deltaTime);
  }
}
