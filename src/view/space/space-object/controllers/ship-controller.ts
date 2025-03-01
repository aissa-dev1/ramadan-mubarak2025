import { Board } from "../../../board";
import { Ship } from "../ship";
import { FloatingSpaceObjectController } from "./floating-space-object-controller";

interface ShipControllerConfig {
  board: Board;
}

export class ShipController extends FloatingSpaceObjectController<Ship> {
  constructor(config: ShipControllerConfig) {
    super({
      objectConstructor: Ship,
      objectCreateDuration: 4000,
      board: config.board,
    });
  }

  override objectDeleteCondition(object: Ship): boolean {
    return object.y < -object.size;
  }
}
