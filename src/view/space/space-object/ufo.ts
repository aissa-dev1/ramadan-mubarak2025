import { SpaceObject } from ".";
import { getRandomXDirection } from "../../../utils/get-random-xdirection";
import { Board } from "../../board";

interface UfoConfig {
  id: string;
  board: Board;
}

export class Ufo extends SpaceObject {
  private direction = getRandomXDirection();
  private speed = 100;

  constructor(config: UfoConfig) {
    super({
      id: config.id,
      group: "ufos",
      x: 0,
      y: config.board.getRandomHeight(),
      size: 40,
      src: "/ufo.svg",
      board: config.board,
    });
  }

  override init() {
    if (this.direction === "left") {
      this.updateX(this.board.width);
    } else {
      this.updateX(0);
    }
  }

  override update(deltaTime: number) {
    super.update(deltaTime);

    if (this.direction === "left") {
      this.updateX(this.x - this.speed * deltaTime);
    } else {
      this.updateX(this.x + this.speed * deltaTime);
    }
  }
}
