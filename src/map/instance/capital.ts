import {City} from '../city.js';
import {Location} from '../location.js';

export const Capital = new City('Capital');

export const CapitalDungeon = new Location('CapitalDungeon');

Capital.addChild(CapitalDungeon);