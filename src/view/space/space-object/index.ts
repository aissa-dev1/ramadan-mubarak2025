import { Board } from "../../board";

interface SpaceObjectConfig {
  id: string;
  group?: string;
  x: number;
  y: number;
  size: number;
  src: string;
  board: Board;
}

export abstract class SpaceObject {
  protected board: Board;

  readonly id: string;
  readonly group?: string;
  private _x: number;
  private _y: number;
  private _size: number;
  protected src: string;
  protected image: HTMLImageElement;

  constructor(config: SpaceObjectConfig) {
    this.id = config.id;
    this.group = config.group;
    this._x = config.x;
    this._y = config.y;
    this._size = config.size;
    this.src = config.src;
    this.image = new Image();
    this.image.src = this.src;
    this.board = config.board;
  }

  init() {}

  draw() {
    this.board.ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
  }

  update(_deltaTime: number) {}

  updateX(x: number) {
    this._x = x;
  }

  updateY(y: number) {
    this._y = y;
  }

  updateSize(size: number) {
    this._size = size;
  }

  updateSrc(src: string) {
    this.src = src;
    this.image.src = this.src;
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
