import { BlockTypes } from '../data/blocks';
import { Block } from './block';
import { Chunk } from './chunk';
import { Game } from './game';

export class World {
  static readonly height = 100 as const;
  public chunks: Chunk[];

  public constructor(private game: Game) {
    this.chunks = Array.from({ length: 100 }, (_, o) => new Chunk(o));
  }

  public screenToWorldCoordinates(
    screenX: number,
    screenY: number
  ): [number, number] {
    const worldX = Math.floor(
      screenX / Block.size + this.game.camera.position.x
    );
    const worldY =
      World.height -
      1 -
      Math.floor(screenY / Block.size + this.game.camera.position.y);
    return [worldX, worldY];
  }

  public worldToScreenCoordinates(
    worldX: number,
    worldY: number
  ): [number, number] {
    const screenX = (worldX - this.game.camera.position.x) * Block.size;
    const screenY =
      (World.height - 1 - worldY - this.game.camera.position.y) * Block.size;
    return [screenX, screenY];
  }

  public blockAtCoordinates(worldX: number, worldY: number): Block {
    worldX = Math.floor(worldX);
    worldY = Math.ceil(worldY);

    const chunk = Math.floor(worldX / Chunk.width);
    const blockX = worldX % Chunk.width;

    return (
      this.chunks[chunk]?.blocks?.[blockX]?.[worldY] ??
      new Block(BlockTypes.Unknown, 0)
    );
  }
}
