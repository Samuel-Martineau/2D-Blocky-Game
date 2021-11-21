export class Vector {
  constructor(public x: number, public y: number) {}

  get mag(): number {
    return Math.hypot(this.x, this.y);
  }

  get angle(): number {
    return Math.atan(this.y / this.x);
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

  scale(targetMag: number): Vector {
    const k = targetMag / this.mag;
    this.x *= k;
    this.y *= k;
    return this;
  }

  clone(): Vector {
    return new Vector(this.x, this.y);
  }

  static add(a: Vector, b: Vector): Vector {
    return a.clone().add(b);
  }

  static sub(a: Vector, b: Vector): Vector {
    return a.clone().sub(b);
  }

  static scale(a: Vector, mag: number): Vector {
    return a.clone().scale(mag);
  }
}
