import { Canvas } from '../canvas';
import { Vector } from '../utils/vector';

export class Entity {
  private position: Vector;
  private velocity: Vector;
  private acceleration: Vector;

  constructor(x: number, y: number) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
  }

  update(forces: Vector[], ellapsedTime: number) {
    this.acceleration = forces.reduce(
      (force, curr) => Vector.add(curr, force).scale(ellapsedTime),
      new Vector(0, 0)
    );
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  draw() {
    const { x, y } = this.position;
    Canvas.drawCircle(x, y, 10, 'blue', 'red', 3);
  }
}
