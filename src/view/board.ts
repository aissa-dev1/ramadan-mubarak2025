interface BoardConfig {
  width: number;
  height: number;
}

export class Board {
  readonly canvas = document.createElement("canvas");
  readonly ctx = this.canvas.getContext("2d")!;
  private _width: number;
  private _height: number;
  private _defaultWidth: number;
  private _defaultHeight: number;

  constructor(config: BoardConfig) {
    this._width = config.width;
    this._height = config.height;
    this._defaultWidth = config.width;
    this._defaultHeight = config.height;
  }

  init() {
    this.canvas.width = this._width;
    this.canvas.height = this._height;

    this.handleResponsiveness();

    window.addEventListener("resize", () => {
      this.handleResponsiveness();
    });

    document.body.appendChild(this.canvas);
  }

  updateWidth(w: number) {
    this._width = w;
    this.canvas.width = this._width;
  }

  updateHeight(h: number) {
    this._height = h;
    this.canvas.height = this._height;
  }

  getRandomWidth() {
    return Math.floor(Math.random() * this.width);
  }

  getRandomHeight() {
    return Math.floor(Math.random() * this.height);
  }

  getCenterX() {
    return this.width / 2;
  }

  getCenterY() {
    return this.height / 2;
  }

  private handleResponsiveness() {
    if (window.innerWidth > 600 && window.innerWidth <= 800) {
      this.updateWidth(600);
      this.updateHeight(this.defaultHeight);
    } else if (window.innerWidth <= 600) {
      this.updateWidth(window.innerWidth);
      this.updateHeight(window.innerHeight);
    } else {
      this.updateWidth(this.defaultWidth);
      this.updateHeight(this.defaultHeight);
    }
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get defaultWidth(): number {
    return this._defaultWidth;
  }

  get defaultHeight(): number {
    return this._defaultHeight;
  }
}
