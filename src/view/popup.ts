import { SFXController } from "../controllers/sfx-controller";
import { Board } from "./board";

interface PopUpConfig {
  board: Board;
}

export class PopUp {
  private board: Board;

  private app = document.getElementById("app")!;
  private container = document.createElement("div");
  private img = document.createElement("img");
  private title = document.createElement("h2");
  private description = document.createElement("p");
  private closeButton = document.createElement("button");
  private followMeText = document.createElement("p");
  private followMeLink = document.createElement("a");

  private _opened = false;
  readonly animationDuration = 500;

  constructor(config: PopUpConfig) {
    this.board = config.board;
  }

  init() {
    this.container.classList.add("popup_container");
    this.followMeText.classList.add("follow_me_text");

    this.img.src = "/ramadan-mubarak.jpg";
    this.img.alt = "Ramadan Mubarak";

    this.followMeLink.href = "https://www.instagram.com/aissa.creates";
    this.followMeLink.target = "_blank";

    this.title.textContent = "Ramadan Mubarak";
    this.description.textContent =
      "Wishing you and your family a blessed Ramadan filled with peace joy, and prosperity.";
    this.closeButton.textContent = "Close";
    this.followMeLink.textContent = "@aissa.creates";

    this.resize();

    this.closeButton.addEventListener("click", () => {
      this.close();
      SFXController.playClick();
    });

    this.followMeText.append(
      document.createTextNode("Follow me on "),
      this.followMeLink
    );
    this.container.append(
      this.img,
      this.title,
      this.description,
      this.closeButton,
      this.followMeText
    );
  }

  open() {
    this.resize();
    this.app.appendChild(this.container);
    setTimeout(() => {
      this.container.classList.add("active");
      SFXController.playNotification();
    }, this.animationDuration);
    this._opened = true;
  }

  close() {
    this.container.classList.remove("active");
    setTimeout(() => {
      this.app.removeChild(this.container);
      this._opened = false;
    }, this.animationDuration);
  }

  resize() {
    this.container.style.width = `${this.board.width}px`;
    this.container.style.height = `${this.board.height}px`;
  }

  get opened(): boolean {
    return this._opened;
  }
}
