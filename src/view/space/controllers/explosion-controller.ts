import { SFXController } from "../../../controllers/sfx-controller";
import { Board } from "../../board";
import { Explosion, ExplosionConfig } from "../explosion";

interface ExplosionControllerConfig {
  board: Board;
}

export class ExplosionController {
  private board: Board;
  private explosions = new Array<Explosion>();

  constructor(config: ExplosionControllerConfig) {
    this.board = config.board;
  }

  draw() {
    for (const explosion of this.explosions) {
      explosion.draw(this.board.ctx);
    }
  }

  update(deltaTime: number) {
    for (const explosion of this.explosions) {
      if (explosion.ended) {
        this.explosions.splice(this.explosions.indexOf(explosion), 1);
        continue;
      }

      explosion.update(deltaTime);
    }
  }

  addExplosion(config: ExplosionConfig) {
    this.explosions.push(new Explosion(config));
    SFXController.playExplosion();
  }
}
