import { Board } from "../../board";
import { Planet } from "./planet";

interface MoonConfig {
  size: number;
  board: Board;
}

export class Moon extends Planet {
  constructor(config: MoonConfig) {
    super({
      id: "moon",
      size: config.size,
      src: "/moon.svg",
      board: config.board,
    });
  }

  override update(deltaTime: number): void {
    super.update(deltaTime);

    if (this.x + this.size >= this.board.width) {
      this.updateX(this.board.getRandomWidth());
    }
    if (this.y + this.size >= this.board.height) {
      this.updateY(this.board.getRandomHeight());
    }
  }
}
