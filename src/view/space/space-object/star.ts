import { SpaceObject } from ".";
import { Board } from "../../board";

export interface StarConfig {
  id: string;
  board: Board;
}

export class Star extends SpaceObject {
  private defaultSize = 5;
  private animation: "maturing" | "shrinking" = "maturing";
  private animateSizeBy = 5;

  constructor(config: StarConfig) {
    super({
      id: config.id,
      group: "stars",
      x: config.board.getRandomWidth(),
      y: config.board.getRandomHeight(),
      size: 0,
      src: "/star.svg",
      board: config.board,
    });
  }

  override init() {
    this.updateSize(this.defaultSize);
  }

  override update(deltaTime: number) {
    super.update(deltaTime);

    if (this.size <= this.defaultSize) {
      this.animation = "maturing";
    }
    if (this.size >= this.defaultSize * 2) {
      this.animation = "shrinking";
    }
    if (this.animation === "maturing") {
      this.updateSize(this.size + this.animateSizeBy * deltaTime);
    } else {
      this.updateSize(this.size - this.animateSizeBy * deltaTime);
    }
  }
}
