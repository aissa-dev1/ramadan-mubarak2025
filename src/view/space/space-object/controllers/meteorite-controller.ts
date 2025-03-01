import { Board } from "../../../board";
import { Meteorite } from "../meteorite";
import { FloatingSpaceObjectController } from "./floating-space-object-controller";

interface MeteoriteControllerConfig {
  board: Board;
}

export class MeteoriteController extends FloatingSpaceObjectController<Meteorite> {
  constructor(config: MeteoriteControllerConfig) {
    super({
      objectConstructor: Meteorite,
      objectCreateDuration: 3000,
      board: config.board,
    });
  }

  override objectDeleteCondition(object: Meteorite): boolean {
    return object.y >= this.board.height;
  }
}
