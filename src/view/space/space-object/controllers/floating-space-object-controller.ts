import { SpaceObject } from "..";
import { detectCollision } from "../../../../utils/detect-collision";
import { Board } from "../../../board";
import { ExplosionController } from "../../controllers/explosion-controller";

interface FloatingSpaceObjectControllerConfig<T extends SpaceObject> {
  board: Board;
  objectConstructor: new (config: { id: string; board: Board }) => T;
  objectCreateDuration: number;
}

export abstract class FloatingSpaceObjectController<T extends SpaceObject> {
  protected board: Board;
  protected objectConstructor: new (config: { id: string; board: Board }) => T;
  protected objectCreateDuration: number;

  private _objects = new Array<T>();

  constructor(config: FloatingSpaceObjectControllerConfig<T>) {
    this.board = config.board;
    this.objectConstructor = config.objectConstructor;
    this.objectCreateDuration = config.objectCreateDuration;
  }

  init() {
    setInterval(() => {
      const object = new this.objectConstructor({
        id: `${this.objectConstructor.name.toLowerCase()}${
          this.objects.length
        }`,
        board: this.board,
      });
      object.init();
      this.objects.push(object);
    }, this.objectCreateDuration);
  }

  draw() {
    for (const object of this.objects) {
      object.draw();
    }
  }

  update(deltaTime: number) {
    for (const object of this.objects) {
      if (this.objectDeleteCondition(object)) {
        this.objects.splice(this.objects.indexOf(object), 1);
        continue;
      }

      object.update(deltaTime);
    }
  }

  abstract objectDeleteCondition(object: T): boolean;

  detectSelfCollision(explosionController: ExplosionController) {
    for (let i = 0; i < this.objects.length; i++) {
      const object = this.objects[i];
      for (let j = i + 1; j < this.objects.length; j++) {
        const object2 = this.objects[j];
        if (
          detectCollision(
            {
              x: object.x,
              y: object.y,
              width: object.size,
              height: object.size,
            },
            {
              x: object2.x,
              y: object2.y,
              width: object2.size,
              height: object2.size,
            }
          )
        ) {
          this.objects.splice(i, 1);
          this.objects.splice(j, 1);
          const explosionX =
            (object.x + object.size / 2 + object2.x + object2.size / 2) / 2;
          const explosionY =
            (object.y + object.size / 2 + object2.y + object2.size / 2) / 2;
          explosionController.addExplosion({
            x: explosionX,
            y: explosionY,
          });
          continue;
        }
      }
    }
  }

  detectCollision(
    objects2: Array<T | SpaceObject>,
    explosionController: ExplosionController
  ) {
    for (let i = 0; i < this.objects.length; i++) {
      const object = this.objects[i];
      for (let j = 0; j < objects2.length; j++) {
        const object2 = objects2[j];
        if (
          detectCollision(
            {
              x: object.x,
              y: object.y,
              width: object.size,
              height: object.size,
            },
            {
              x: object2.x,
              y: object2.y,
              width: object2.size,
              height: object2.size,
            }
          )
        ) {
          this.objects.splice(i, 1);
          objects2.splice(j, 1);
          const explosionX =
            (object.x + object.size / 2 + object2.x + object2.size / 2) / 2;
          const explosionY =
            (object.y + object.size / 2 + object2.y + object2.size / 2) / 2;
          explosionController.addExplosion({
            x: explosionX,
            y: explosionY,
          });
          continue;
        }
      }
    }
  }

  get objects(): Array<T> {
    return this._objects;
  }
}
