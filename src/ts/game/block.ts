import { Canvas } from '../canvas';
import { BlockType } from '../data/blocks';

export class Block {
  static size = 32;

  public constructor(public type: BlockType, public hue: number) {}

  public draw(x: number, y: number) {
    Canvas.drawRectangle(
      x,
      y,
      Block.size,
      Block.size,
      this.type.color.rotate(this.hue).toString()
    );
  }
}
