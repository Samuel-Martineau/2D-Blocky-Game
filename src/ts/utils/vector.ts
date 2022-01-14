import { roundPrecision } from './math';

export class Vector {
  private _x!: number;
  private _y!: number;

  constructor(x: number, y: number, private precision: number = 7) {
    this.x = x;
    this.y = y;
  }

  get x() {
    return this._x;
  }
  set x(newValue: number) {
    this._x = roundPrecision(newValue, this.precision);
  }

  get y() {
    return this._y;
  }
  set y(newValue: number) {
    this._y = roundPrecision(newValue, this.precision);
  }

  get mag(): number {
    return Math.hypot(this.x, this.y);
  }

  get angle(): number {
    return Math.atan2(this.y, this.x);
  }

  add(other: Vector): Vector {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  sub(other: Vector): Vector {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  mult(factor: number): Vector {
    this.x *= factor;
    this.y *= factor;
    return this;
  }

  scale(targetMag: number): Vector {
    const k = targetMag / this.mag;
    this.x *= k;
    this.y *= k;
    return this;
  }

  clone(precision = this.precision): Vector {
    return new Vector(this.x, this.y, precision);
  }

  static add(a: Vector, b: Vector): Vector {
    return a.clone().add(b);
  }

  static sub(a: Vector, b: Vector): Vector {
    return a.clone().sub(b);
  }

  static mult(a: Vector, factor: number): Vector {
    return a.clone().mult(factor);
  }

  static scale(a: Vector, mag: number): Vector {
    return a.clone().scale(mag);
  }
}
