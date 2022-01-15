import { Canvas } from '../canvas';
import { Vector } from '../utils/vector';
import { Block } from './block';
import { Camera } from './camera';
import { Entity } from './entity';
import { World } from './world';

export class Game {
  public world = new World(this);
  public camera = new Camera();
  private entities: Entity[] = [];

  public frictionEnabled = true;
  public gravityEnabled = true;

  public start() {
    this.loop();
  }

  private loop() {
    this.update();
    this.draw();

    requestAnimationFrame(this.loop.bind(this));
  }

  private update() {
    const gravity = new Vector(0, -0.1);

    for (const entity of this.entities) {
      const friction = new Vector(entity.velocity.x, 0).mult(-0.15);

      if (this.gravityEnabled) entity.applyForce(gravity);
      if (this.frictionEnabled) entity.applyForce(friction);

      entity.update();
    }
  }

  private draw() {
    Canvas.clear();

    for (let x = 0; x < Canvas.width + Block.size; x += Block.size) {
      for (let y = 0; y < Canvas.height + Block.size; y += Block.size) {
        const [worldX, worldY] = this.world.screenToWorldCoordinates(x, y);
        const [screenX, screenY] = this.world.worldToScreenCoordinates(
          worldX,
          worldY
        );
        const block = this.world.blockAtCoordinates(worldX, worldY);
        block.draw(Math.floor(screenX), Math.floor(screenY));
      }
    }

    for (const entity of this.entities) {
      entity.draw();
    }
  }

  public addEntity(entity: Entity) {
    this.entities.push(entity);
  }
}
