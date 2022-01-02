export class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(a: number | { x: number; y: number }): Point {
    if (typeof a === 'number') return this._add({ x: a, y: a });
    return this._add(a);
  }
  sub(a: number | { x: number; y: number }): Point {
    if (typeof a === 'number') return this._sub({ x: a, y: a });
    return this._sub(a);
  }
  mul(a: number | { x: number; y: number }): Point {
    if (typeof a === 'number') return this._mul({ x: a, y: a });
    return this._mul(a);
  }
  div(a: number | { x: number; y: number }): Point {
    if (typeof a === 'number') return this._div({ x: a, y: a });
    return this._div(a);
  }
  floor(): Point {
    return new Point(Math.floor(this.x), Math.floor(this.y));
  }

  private _add({ x, y }: { x: number; y: number }): Point {
    return new Point(this.x + x, this.y + y);
  }
  private _sub({ x, y }: { x: number; y: number }): Point {
    return new Point(this.x - x, this.y - y);
  }
  private _mul({ x, y }: { x: number; y: number }): Point {
    return new Point(this.x * x, this.y * y);
  }
  private _div({ x, y }: { x: number; y: number }): Point {
    return new Point(this.x / x, this.y / y);
  }
}
