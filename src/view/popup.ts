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
  private buttonsContainer = document.createElement("div");
  private closeButton = document.createElement("button");
  private refreshButton = document.createElement("button");
  private followAndCodeContainer = document.createElement("div");
  private followMeText = document.createElement("p");
  private followMeLink = document.createElement("a");
  private seeSourceCodeText = document.createElement("p");
  private seeSourceCodeLink = document.createElement("a");

  private _opened = false;
  readonly animationDuration = 500;

  constructor(config: PopUpConfig) {
    this.board = config.board;
  }

  init() {
    this.container.classList.add("popup_container");
    this.buttonsContainer.classList.add("buttons_container");
    this.followAndCodeContainer.classList.add("follow_and_code_container");

    this.img.src = "/ramadan-mubarak.jpg";
    this.img.alt = "Ramadan Mubarak";

    this.followMeLink.href = "https://www.instagram.com/aissa.creates";
    this.followMeLink.target = "_blank";
    this.seeSourceCodeLink.href =
      "https://github.com/aissa-dev1/ramadan-mubarak2025";
    this.seeSourceCodeLink.target = "_blank";

    this.title.textContent = "Ramadan Mubarak";
    this.description.textContent =
      "Wishing you and your family a blessed Ramadan filled with peace joy, and prosperity.";
    this.closeButton.textContent = "Close";
    this.refreshButton.textContent = "Refresh";
    this.followMeLink.textContent = "@aissa.creates";
    this.seeSourceCodeLink.textContent = "source code";

    this.resize();

    this.closeButton.addEventListener("click", () => {
      this.close();
      SFXController.playClick();
    });
    this.refreshButton.addEventListener("click", () => {
      this.close();
      setTimeout(() => {
        window.location.reload();
      }, this.animationDuration);
      SFXController.playClick();
    });

    this.buttonsContainer.append(this.closeButton, this.refreshButton);
    this.followMeText.append(
      document.createTextNode("Follow me on "),
      this.followMeLink
    );
    this.seeSourceCodeText.append(
      document.createTextNode("or see "),
      this.seeSourceCodeLink
    );
    this.followAndCodeContainer.append(
      this.followMeText,
      this.seeSourceCodeText
    );
    this.container.append(
      this.img,
      this.title,
      this.description,
      this.buttonsContainer,
      this.followAndCodeContainer
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
