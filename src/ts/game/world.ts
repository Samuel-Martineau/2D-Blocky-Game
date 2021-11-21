import { roundPrecision } from '../utils/math';
import { Block, BlockType } from './block';
import { Camera } from './camera';
import { Chunk } from './chunk';

export class World {
  static readonly height = 100 as const;
  public chunks: Chunk[];

  public constructor() {
    this.chunks = Array.from({ length: 100 }, (_, o) => new Chunk(o));
  }

  public screenToWorldCoordinates(
    screenX: number,
    screenY: number
  ): [number, number] {
    const worldX = Math.floor(
      screenX / Block.size + roundPrecision(Camera.position.x, 5)
    );
    const worldY =
      World.height -
      1 -
      Math.floor(screenY / Block.size + roundPrecision(Camera.position.y, 5));
    return [worldX, worldY];
  }

  public blockAtCoordinates(worldX: number, worldY: number): Block {
    const chunk = Math.floor(worldX / Chunk.width);
    const blockX = worldX % Chunk.width;
    return (
      this.chunks[chunk]?.blocks?.[blockX]?.[worldY] ?? new Block(BlockType.Air)
    );
  }
}
