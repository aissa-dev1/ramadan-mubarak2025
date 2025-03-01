import { Board } from "./board";

interface SpotLightConfig {
  board: Board;
}

export class SpotLight {
  private _x: number;
  private _y: number;
  private _size = 30;
  private strokeStyle = "#ffffff";
  private board: Board;

  constructor(config: SpotLightConfig) {
    this.board = config.board;
    this._x = this.board.getCenterX();
    this._y = this.board.getCenterY();
  }

  init() {
    this.resetX();
    this.resetY();

    this.board.canvas.addEventListener("mousemove", (e) => {
      this._x = e.offsetX;
      this._y = e.offsetY;
    });
    this.board.canvas.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      const rect = this.board.canvas.getBoundingClientRect();
      this._x = touch.clientX - rect.left;
      this._y = touch.clientY - rect.top;
      e.preventDefault();
    });
  }

  draw() {
    const ctx = this.board.ctx;

    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.fillStyle = this.strokeStyle;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }

  update(_deltaTime: number) {}

  resetX() {
    this._x = this.board.getCenterX();
  }

  resetY() {
    this._y = this.board.getCenterY();
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get size(): number {
    return this._size;
  }
}
