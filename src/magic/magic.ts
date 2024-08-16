import {UUID} from '../utils/randomUUID.js';

export enum MagicType {
  Divine = 'Divine',
  Arcane = 'Arcane',
}

export enum School {
  Divination = 'Divination',
  Necromancy = 'Necromancy',
  Enchantment = 'Enchantment',
  Illusion = 'Illusion',
  Conjuration = 'Conjuration',
  Evocation = 'Evocation',
  Transmutation = 'Transmutation',
  Abjuration = 'Abjuration',
}

export interface Magic {
  id: UUID;
  type: MagicType;
  school: School;
  name: string;
  description?: string;
}