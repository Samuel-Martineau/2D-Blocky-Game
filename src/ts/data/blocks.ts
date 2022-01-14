import { Color } from '../utils/color';

export enum BlockKind {
  Solid,
  Liquid,
  Gaseous,
}

export interface BlockType {
  name: string;
  color: Color;
  kind: BlockKind;
}

type BlockList = 'Unknown' | 'Air' | 'Dirt' | 'Grass';

export const BlockTypes: { [key in BlockList]: BlockType } = {
  Unknown: {
    name: 'Inconnu',
    color: new Color(300, 100, 25),
    kind: BlockKind.Gaseous,
  },
  Air: {
    name: 'Air',
    color: new Color(184, 81, 58, 0.5),
    kind: BlockKind.Gaseous,
  },
  Dirt: {
    name: 'Terre',
    color: new Color(19, 56, 40),
    kind: BlockKind.Solid,
  },
  Grass: {
    name: 'Gazon',
    color: new Color(120, 100, 25),
    kind: BlockKind.Solid,
  },
};
