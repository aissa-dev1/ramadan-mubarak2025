import { SpaceObject } from ".";
import { Board } from "../../board";

interface SatelliteConfig {
  id: string;
  size: number;
  board: Board;
}

export class Satellite extends SpaceObject {
  private direction = "left";
  private defaultX: number;
  private moveXBy = 25;

  constructor(config: SatelliteConfig) {
    super({
      id: config.id,
      group: "satellites",
      x: config.board.getRandomWidth(),
      y: config.board.getRandomHeight(),
      size: config.size,
      src: "/satellite.svg",
      board: config.board,
    });

    this.defaultX = this.x;
  }

  override update(deltaTime: number) {
    super.update(deltaTime);

    if (this.x < this.defaultX - this.size) {
      this.direction = "right";
    }
    if (this.x > this.defaultX + this.size) {
      this.direction = "left";
    }
    if (this.direction === "left") {
      this.updateX(this.x - this.moveXBy * deltaTime);
    } else {
      this.updateX(this.x + this.moveXBy * deltaTime);
    }
  }
}
