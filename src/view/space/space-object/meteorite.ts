import { SpaceObject } from ".";
import { Board } from "../../board";

interface MeteoriteConfig {
  id: string;
  board: Board;
}

export class Meteorite extends SpaceObject {
  private speed = 125;

  constructor(config: MeteoriteConfig) {
    super({
      id: config.id,
      group: "meteorites",
      x: config.board.width,
      y: config.board.getRandomHeight(),
      size: 40,
      src: "/meteorite.svg",
      board: config.board,
    });
  }

  override update(deltaTime: number) {
    super.update(deltaTime);

    this.updateX(this.x - this.speed * deltaTime);
    this.updateY(this.y + this.speed * deltaTime);
  }
}
