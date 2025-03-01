import { SpaceObject } from ".";
import { Board } from "../../board";

export interface MultipleMeteoriteConfig {
  id: string;
  board: Board;
}

export class MultipleMeteorite extends SpaceObject {
  private speed = 114.5;

  constructor(config: MultipleMeteoriteConfig) {
    super({
      id: config.id,
      group: "multiple-meteorites",
      x: 0,
      y: config.board.getRandomHeight(),
      size: 40,
      src: "/multiple-meteorite.svg",
      board: config.board,
    });
  }

  override update(deltaTime: number) {
    super.update(deltaTime);

    this.updateX(this.x + this.speed * deltaTime);
    this.updateY(this.y + this.speed * deltaTime);
  }
}
