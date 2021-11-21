import { Canvas } from '../canvas';

export enum BlockType {
  Air,
  Dirt,
}

export class Block {
  static size = 32;

  public constructor(public type: BlockType, public color?: string) {}

  public draw(x: number, y: number) {
    if (this.type !== BlockType.Air)
      Canvas.drawRectangle(x, y, Block.size + 1, Block.size + 1, this.color);
  }
}
