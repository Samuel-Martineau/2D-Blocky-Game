import { BlockTypes } from '../data/blocks';
import { randomNoise } from '../random';
import { Block } from './block';
import { World } from './world';

export class Chunk {
  static readonly width = 16 as const;
  public blocks: Block[][];

  constructor(public readonly chunkPosition: number) {
    this.blocks = this.generateEmptyGrid() as Block[][];

    this.transformBlocks((x, y) => {
      const worldX = this.chunkPosition * Chunk.width + x;

      const surface = randomNoise(worldX / 30, 1) * 10 + 50;

      let isAir = true;
      if (y <= surface) isAir = false;

      const hue = randomNoise(worldX, y) * 5;

      if (!isAir) return new Block(BlockTypes.Unknown, hue);
      return new Block(BlockTypes.Air, hue);
    });

    this.transformBlocks((x, y, currentBlock, newBlocks) => {
      const hue = currentBlock?.hue ?? 0;

      const block = this.blocks[x][y];
      const blockAbove =
        y < World.height
          ? this.blocks[x][y + 1]
          : new Block(BlockTypes.Air, hue);

      if (block.type === BlockTypes.Air || blockAbove.type !== BlockTypes.Air)
        return block;

      for (let i = 0; i < 3; i++)
        newBlocks[x][y - i] = new Block(
          BlockTypes.Grass,
          randomNoise(x, y - i) * 40
        );

      return;
    });

    this.transformBlocks((x, y, currentBlock) => {
      const block = this.blocks[x][y];

      if (block.type === BlockTypes.Unknown)
        return new Block(BlockTypes.Dirt, currentBlock!.hue);

      return;
    });
  }

  private generateEmptyGrid(): (Block | undefined)[][] {
    return Array.from({ length: Chunk.width }, () =>
      Array.from({ length: World.height }, () => undefined)
    );
  }

  private transformBlocks(
    transformBlock: (
      x: number,
      y: number,
      currentBlock: Block | undefined,
      newBlocks: (Block | undefined)[][]
    ) => Block | undefined
  ): void {
    const newBlocks = this.generateEmptyGrid();
    for (let x = 0; x < this.blocks.length; x++) {
      for (let y = 0; y < this.blocks[x].length; y++) {
        const getCurrentBlock = () => newBlocks[x][y] ?? this.blocks[x][y];
        newBlocks[x][y] =
          transformBlock(x, y, getCurrentBlock(), newBlocks) ??
          getCurrentBlock();
      }
    }
    this.blocks = newBlocks as Block[][];
  }
}
