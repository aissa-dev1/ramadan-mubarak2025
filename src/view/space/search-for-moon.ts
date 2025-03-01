import { detectCollision } from "../../utils/detect-collision";
import { Board } from "../board";
import { PopUp } from "../popup";
import { SpotLight } from "../spot-light";
import { Moon } from "./space-object/moon";

interface SearchForMoonConfig {
  spotLight: SpotLight;
  moon: Moon;
  board: Board;
}

export class SearchForMoon {
  private board: Board;
  private spotLight: SpotLight;
  private moon: Moon;
  private popup: PopUp;

  constructor(config: SearchForMoonConfig) {
    this.board = config.board;
    this.spotLight = config.spotLight;
    this.moon = config.moon;
    this.popup = new PopUp({ board: config.board });
  }

  init() {
    this.popup.init();

    window.addEventListener("resize", () => {
      if (this.popup.opened) {
        this.popup.resize();
      }
    });
    this.board.canvas.addEventListener("pointerdown", () => {
      if (this.spotLightAndMoonCollision()) {
        this.handlePopUpOpen();
      }
    });
  }

  update(_deltaTime: number) {}

  private spotLightAndMoonCollision(): boolean {
    return detectCollision(
      {
        x: this.spotLight.x,
        y: this.spotLight.y,
        width: this.spotLight.size,
        height: this.spotLight.size,
      },
      {
        x: this.moon.x,
        y: this.moon.y,
        width: this.moon.size,
        height: this.moon.size,
      }
    );
  }

  private handlePopUpOpen() {
    if (!this.popup.opened) {
      this.popup.open();

      setTimeout(() => {
        this.spotLight.resetX();
        this.spotLight.resetY();
      }, this.popup.animationDuration);
    }
  }
}
