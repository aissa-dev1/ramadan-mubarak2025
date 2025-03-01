import { Board } from "../../../board";
import { Star, StarConfig } from "../star";

interface StarControllerConfig {
  board: Board;
  starsLength?: number;
}

export class StarController {
  private board: Board;

  private starsLength = 100;
  private stars = new Array<Star>();

  constructor(config: StarControllerConfig) {
    this.board = config.board;
    this.starsLength = config.starsLength
      ? config.starsLength
      : this.starsLength;
  }

  init() {
    for (let i = 0; i < this.starsLength; i++) {
      this.addStar({
        id: `star${i}`,
        board: this.board,
      });
    }
  }

  draw() {
    for (const star of this.stars) {
      star.draw();
    }
  }

  update(deltaTime: number) {
    for (const star of this.stars) {
      star.update(deltaTime);
    }
  }

  addStar(config: StarConfig) {
    const star = new Star(config);
    star.init();
    this.stars.push(star);
  }
}
