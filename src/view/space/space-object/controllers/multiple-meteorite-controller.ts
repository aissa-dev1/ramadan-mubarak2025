import { Board } from "../../../board";
import { MultipleMeteorite } from "../multiple-meteorite";
import { FloatingSpaceObjectController } from "./floating-space-object-controller";

interface MultipleMeteoriteControllerConfig {
  board: Board;
}

export class MultipleMeteoriteController extends FloatingSpaceObjectController<MultipleMeteorite> {
  constructor(config: MultipleMeteoriteControllerConfig) {
    super({
      objectConstructor: MultipleMeteorite,
      objectCreateDuration: 6000,
      board: config.board,
    });
  }

  override objectDeleteCondition(object: MultipleMeteorite): boolean {
    return object.y >= this.board.height;
  }
}
