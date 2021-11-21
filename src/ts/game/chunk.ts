import { randomNoise } from '../random';
import { Block, BlockType } from './block';
import { World } from './world';

export class Chunk {
  static readonly width = 16 as const;
  public blocks: Block[][];

  constructor(public readonly chunkPosition: number) {
    this.blocks = Array.from({ length: Chunk.width }, (_, x) =>
      Array.from({ length: World.height }, (_, y) => {
        const worldX = chunkPosition * Chunk.width + x;
        const surface = randomNoise(worldX / 30, 1) * 10 + 50;
        const caves = (randomNoise(worldX / 30, y / 30) + 1) * 128;

        let isAir = true;
        if (y <= surface) isAir = false;
        // if (y <= 30 && Math.ceil(caves) === 1) isAir = true;

        if (!isAir)
          return new Block(BlockType.Dirt, `rgb(${caves},${caves},${caves})`);
        return new Block(BlockType.Air);
      })
    ) as typeof this.blocks;
  }
}
