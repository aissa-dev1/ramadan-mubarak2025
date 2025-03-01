import "./style.css";
import { View } from "./view";
import { Board } from "./view/board";

const board = new Board({
  width: 800,
  height: 600,
});
const view = new View({ board });

document.addEventListener("DOMContentLoaded", () => {
  view.init();
});
