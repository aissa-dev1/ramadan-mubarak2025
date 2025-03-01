import { MusicController } from "../controllers/music-controller";
import { Board } from "./board";
import { Space } from "./space";
import { SearchForMoon } from "./space/search-for-moon";
import { SpotLight } from "./spot-light";

interface ViewConfig {
  board: Board;
}

export class View {
  private board: Board;
  private spotLight: SpotLight;
  private space: Space;
  private searchForMoon: SearchForMoon;

  private lastTime = 0;
  private searchForMoonTextElm = document.createElement("p");

  constructor(config: ViewConfig) {
    this.board = config.board;
    this.space = new Space({ board: this.board });
    this.spotLight = new SpotLight({ board: this.board });
    this.searchForMoon = new SearchForMoon({
      spotLight: this.spotLight,
      moon: this.space.moon,
      board: this.board,
    });
  }

  init() {
    this.board.init();
    this.space.init();
    this.spotLight.init();
    this.searchForMoon.init();
    this.animate();

    this.searchForMoonTextElm.classList.add("search_for_moon_text");
    this.searchForMoonTextElm.textContent = "Search for Ramadan moon 🔍🌕";

    document.addEventListener("pointerdown", () => {
      MusicController.playMainMusic();
    });

    document.body.appendChild(this.searchForMoonTextElm);
  }

  private draw() {
    this.board.ctx.clearRect(0, 0, this.board.width, this.board.height);

    this.space.draw();
    this.spotLight.draw();
  }

  private update(time: number) {
    if (!this.lastTime) this.lastTime = time;

    const deltaTime = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.space.update(deltaTime);
    this.spotLight.update(deltaTime);
    this.searchForMoon.update(deltaTime);
  }

  private animate(time?: number) {
    if (time === undefined) {
      requestAnimationFrame(this.animate.bind(this));
      return;
    }

    this.update(time);
    this.draw();

    requestAnimationFrame(this.animate.bind(this));
  }
}
