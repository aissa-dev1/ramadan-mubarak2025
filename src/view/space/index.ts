import { Board } from "../board";
import { ExplosionController } from "./controllers/explosion-controller";
import { StarController } from "./space-object/controllers/star-controller";
import { MeteoriteController } from "./space-object/controllers/meteorite-controller";
import { MultipleMeteoriteController } from "./space-object/controllers/multiple-meteorite-controller";
import { ShipController } from "./space-object/controllers/ship-controller";
import { UfoController } from "./space-object/controllers/ufo-controller";
import { Moon } from "./space-object/moon";
import { Planet } from "./space-object/planet";
import { Satellite } from "./space-object/satellite";

interface SpaceConfig {
  board: Board;
}

export class Space {
  private board: Board;
  readonly moon: Planet;
  private earth: Planet;
  private mars: Planet;
  private saturn: Planet;
  private jupiter: Planet;
  private uranus: Planet;
  private satellite: Satellite;
  private ufoController: UfoController;
  private shipController: ShipController;
  private meteoriteController: MeteoriteController;
  private multipleMeteoriteController: MultipleMeteoriteController;
  private starController: StarController;
  private explosionController: ExplosionController;

  constructor(config: SpaceConfig) {
    this.board = config.board;
    this.moon = new Moon({
      size: 40,
      board: this.board,
    });
    this.earth = new Planet({
      id: "earth",
      size: 40,
      src: "/earth.svg",
      board: this.board,
    });
    this.mars = new Planet({
      id: "mars",
      size: 40,
      src: "/mars.svg",
      board: this.board,
    });
    this.saturn = new Planet({
      id: "saturn",
      size: 40,
      src: "/saturn.svg",
      board: this.board,
    });
    this.jupiter = new Planet({
      id: "jupiter",
      size: 40,
      src: "/jupiter.svg",
      board: this.board,
    });
    this.uranus = new Planet({
      id: "uranus",
      size: 40,
      src: "/uranus.svg",
      board: this.board,
    });
    this.satellite = new Satellite({
      id: "satellite",
      size: 40,
      board: this.board,
    });
    this.ufoController = new UfoController({
      board: this.board,
    });
    this.shipController = new ShipController({
      board: this.board,
    });
    this.meteoriteController = new MeteoriteController({
      board: this.board,
    });
    this.multipleMeteoriteController = new MultipleMeteoriteController({
      board: this.board,
    });
    this.starController = new StarController({
      board: this.board,
    });
    this.explosionController = new ExplosionController({
      board: this.board,
    });
  }

  init() {
    this.moon.init();
    this.earth.init();
    this.mars.init();
    this.saturn.init();
    this.jupiter.init();
    this.uranus.init();
    this.satellite.init();
    this.ufoController.init();
    this.shipController.init();
    this.meteoriteController.init();
    this.multipleMeteoriteController.init();
    this.starController.init();
  }

  draw() {
    this.moon.draw();
    this.earth.draw();
    this.mars.draw();
    this.saturn.draw();
    this.jupiter.draw();
    this.uranus.draw();
    this.satellite.draw();
    this.ufoController.draw();
    this.shipController.draw();
    this.meteoriteController.draw();
    this.multipleMeteoriteController.draw();
    this.starController.draw();
    this.explosionController.draw();
  }

  update(deltaTime: number) {
    this.moon.update(deltaTime);
    this.earth.update(deltaTime);
    this.mars.update(deltaTime);
    this.saturn.update(deltaTime);
    this.jupiter.update(deltaTime);
    this.uranus.update(deltaTime);
    this.satellite.update(deltaTime);
    this.ufoController.update(deltaTime);
    this.shipController.update(deltaTime);
    this.meteoriteController.update(deltaTime);
    this.multipleMeteoriteController.update(deltaTime);
    this.starController.update(deltaTime);
    this.explosionController.update(deltaTime);
    this.detectCollision();
  }

  private detectCollision() {
    this.ufoController.detectSelfCollision(this.explosionController);
    this.shipController.detectSelfCollision(this.explosionController);
    this.meteoriteController.detectSelfCollision(this.explosionController);
    this.multipleMeteoriteController.detectSelfCollision(
      this.explosionController
    );
    this.ufoController.detectCollision(
      this.shipController.objects,
      this.explosionController
    );
    this.ufoController.detectCollision(
      this.meteoriteController.objects,
      this.explosionController
    );
    this.ufoController.detectCollision(
      this.multipleMeteoriteController.objects,
      this.explosionController
    );
    this.shipController.detectCollision(
      this.ufoController.objects,
      this.explosionController
    );
    this.shipController.detectCollision(
      this.meteoriteController.objects,
      this.explosionController
    );
    this.shipController.detectCollision(
      this.multipleMeteoriteController.objects,
      this.explosionController
    );
    this.meteoriteController.detectCollision(
      this.ufoController.objects,
      this.explosionController
    );
    this.meteoriteController.detectCollision(
      this.shipController.objects,
      this.explosionController
    );
    this.meteoriteController.detectCollision(
      this.multipleMeteoriteController.objects,
      this.explosionController
    );
    this.multipleMeteoriteController.detectCollision(
      this.ufoController.objects,
      this.explosionController
    );
    this.multipleMeteoriteController.detectCollision(
      this.shipController.objects,
      this.explosionController
    );
    this.multipleMeteoriteController.detectCollision(
      this.meteoriteController.objects,
      this.explosionController
    );
  }
}
