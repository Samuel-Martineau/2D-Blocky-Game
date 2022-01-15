import { Canvas } from '../canvas';
import { Vector } from '../utils/vector';
import { Block } from './block';
import { Entity } from './entity';

export class Camera {
  private static precision = 3;

  private trackedEntity!: Entity;

  public track(entity: Entity) {
    this.trackedEntity = entity;
  }

  get position() {
    const cameraWidth = Canvas.width / Block.size;
    const cameraHeight = Canvas.height / Block.size;

    const emx = this.trackedEntity.position.x + this.trackedEntity.width / 2;
    const emy = this.trackedEntity.position.y + this.trackedEntity.height / 2;

    return new Vector(emx - cameraWidth / 2, 102 - emy - cameraHeight / 2);
  }
}
