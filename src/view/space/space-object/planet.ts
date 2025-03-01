import { SpaceObject } from ".";
import { Board } from "../../board";

interface PlanetConfig {
  id: string;
  size: number;
  src: string;
  board: Board;
}

export class Planet extends SpaceObject {
  constructor(config: PlanetConfig) {
    super({
      id: config.id,
      group: "planets",
      x: config.board.getRandomWidth(),
      y: config.board.getRandomHeight(),
      size: config.size,
      src: config.src,
      board: config.board,
    });
  }
}
