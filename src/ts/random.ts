import { makeNoise2D } from 'fast-simplex-noise';
import * as seedrandom from 'seedrandom';

import { seed } from './constants';

export const random = seedrandom(seed);
export const randomNoise = makeNoise2D(random);
