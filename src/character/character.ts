import {Item} from '../item/item.js';
import {Position} from '../map/position.js';
import randomUUID, {UUID} from '../utils/randomUUID.js';
import Alignment from './alignment.js';
import {Race, RaceType} from './race.js';
import {CharacterSize} from './size.js';

export interface CharacterProps {
  name: string;
  raceType: RaceType;
  alignment: Alignment;
  position: Position;
  size?: CharacterSize;
}

export default class Character implements Race {
  id: UUID;
  name: string;
  raceType: RaceType;
  alignment: Alignment;
  bag: Item[] = [];
  position: Position;
  size: CharacterSize;

  constructor({name, raceType, alignment, position, size}: CharacterProps) {
    this.id = randomUUID();
    this.name = name;
    this.raceType = raceType;
    this.alignment = alignment;
    this.position = position;
    this.size = size ?? CharacterSize.Medium;
  }
}