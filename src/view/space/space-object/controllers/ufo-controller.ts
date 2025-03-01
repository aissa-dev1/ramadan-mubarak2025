import { Board } from "../../../board";
import { Ufo } from "../ufo";
import { FloatingSpaceObjectController } from "./floating-space-object-controller";

interface UfoControllerConfig {
  board: Board;
}

export class UfoController extends FloatingSpaceObjectController<Ufo> {
  constructor(config: UfoControllerConfig) {
    super({
      objectConstructor: Ufo,
      objectCreateDuration: 2000,
      board: config.board,
    });
  }

  override objectDeleteCondition(object: Ufo): boolean {
    return object.x > this.board.width || object.x < -object.size;
  }
}
