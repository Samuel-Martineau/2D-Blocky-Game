import { Canvas } from '../canvas';
import { Vector } from '../utils/vector';
import { Block } from './block';
import { Camera } from './camera';
import { Entity } from './entity';
import { World } from './world';

export class Game {
  public world: World;
  private entities: Entity[] = [];
  private lastFrameTime!: number;

  constructor() {
    this.world = new World();
    this.lastFrameTime = Date.now();
    this.loop();
  }

  private loop() {
    this.update();
    this.draw();

    requestAnimationFrame(this.loop.bind(this));
  }

  private update() {
    const ellapsedTime = (Date.now() - this.lastFrameTime) / 1000;
    this.lastFrameTime = Date.now();

    const gravity = new Vector(0, 10);

    for (const entity of this.entities) {
      entity.update([gravity], ellapsedTime);
    }

    Camera.position.x += 0.5;
  }

  private draw() {
    Canvas.clear();

    for (let x = 0; x < Canvas.width + Block.size; x += Block.size) {
      for (let y = 0; y < Canvas.height + Block.size; y += Block.size) {
        const [worldX, worldY] = this.world.screenToWorldCoordinates(x, y);
        const block = this.world.blockAtCoordinates(worldX, worldY);
        block.draw(
          Math.floor((worldX - Camera.position.x) * Block.size),

          Math.floor(
            (World.height - 1 - worldY - Camera.position.y) * Block.size
          )
        );
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
