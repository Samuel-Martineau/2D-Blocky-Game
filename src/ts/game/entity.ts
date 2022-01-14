import { Canvas } from '../canvas';
import { BlockKind } from '../data/blocks';
import { Vector } from '../utils/vector';
import { Block } from './block';
import { Game } from './game';

export class Entity {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  forces: Vector[] = [];

  onGround = false;

  private image: HTMLImageElement;

  constructor(
    private game: Game,
    x: number,
    y: number,
    public width: number,
    public height: number,
    imageUrl: string
  ) {
    game.addEntity(this);

    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);

    this.image = new Image(width, height);
    this.image.src = imageUrl;
  }

  applyForce(force: Vector) {
    this.forces.push(force);
  }

  update() {
    this.onGround = false;

    this.acceleration = this.forces.reduce(
      (curr, f) => Vector.add(curr, f),
      new Vector(0, 0)
    );
    this.forces = [];
    this.velocity.add(this.acceleration);

    if (this.velocity.mag === 0) return;

    const increment = 0.01;
    const errorMargin = 0.05;
    for (let i = 0; i < this.velocity.mag; i += increment) {
      let partialVelocity = Vector.scale(this.velocity, increment);
      const possibleNewPosition = Vector.add(this.position, partialVelocity);

      const canGoReducer = (curr: boolean, [x, y]: number[]) =>
        curr &&
        this.game.world.blockAtCoordinates(x, y).type.kind ===
          BlockKind.Gaseous;

      const canGoX = [
        [possibleNewPosition.x, this.position.y - errorMargin],
        [possibleNewPosition.x + this.width, this.position.y - errorMargin],
        [possibleNewPosition.x, this.position.y - this.height + errorMargin],
        [
          possibleNewPosition.x + this.width,
          this.position.y - this.height + errorMargin,
        ],
      ].reduce(canGoReducer, true);
      const canGoY = [
        [this.position.x, possibleNewPosition.y],
        [this.position.x + this.width, possibleNewPosition.y],
        [this.position.x, possibleNewPosition.y - this.height],
        [this.position.x + this.width, possibleNewPosition.y - this.height],
      ].reduce(canGoReducer, true);
      const canGo = canGoX || canGoY;

      if (!canGoX) {
        this.velocity = new Vector(0, this.velocity.y);
        partialVelocity = new Vector(0, partialVelocity.y);
      }
      if (!canGoY) {
        this.velocity = new Vector(this.velocity.x, 0);
        partialVelocity = new Vector(partialVelocity.x, 0);
        this.onGround = true;
      }
      if (!canGo) break;

      this.position.add(partialVelocity);
    }

    this.acceleration = new Vector(0, 0);
  }

  draw() {
    const { x, y } = this.position;
    const [screenX, screenY] = this.game.world.worldToScreenCoordinates(x, y);
    Canvas.drawImage(
      screenX,
      screenY,
      this.width * Block.size,
      this.height * Block.size,
      this.image
    );
  }
}
