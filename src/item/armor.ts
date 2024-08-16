import {Buff} from '../character/buff.js';
import randomUUID, {UUID} from '../utils/randomUUID.js';
import {Item, ItemType} from './item.js';

export enum ArmorType {
  LightArmor = 'LightArmor',
  MediumArmor = 'MediumArmor',
  HeavyArmor = 'HeavyArmor',
  // Shield = 'Shield',
}

export interface TypedArmorProps {
  weight?: number;
  name: string;
  description?: string;
  AC?: number;
  buffs?: Buff[];
}

export interface ArmorProps {
  weight: number;
  armorType: ArmorType;
  name: string;
  description?: string;
  AC: number;
  buffs: Buff[];
}

export class Armor implements Item {
  id: UUID;
  itemType = ItemType.Armor;
  weight: number;
  armorType: ArmorType;
  name: string;
  description?: string;
  AC: number;
  buffs: Buff[];

  // todo 最大敏捷加值、奥数失败率

  constructor({weight, armorType, name, description, AC, buffs}: ArmorProps) {
    this.id = randomUUID();
    this.weight = weight;
    this.armorType = armorType;
    this.name = name;
    this.description = description ?? '';
    this.AC = AC;
    this.buffs = buffs ?? [];
  }
}

/**
 * 链甲
 */
export class Chainmail extends Armor {
  constructor(props: TypedArmorProps) {
    super({
      weight: 15,
      armorType: ArmorType.LightArmor,
      AC: 6,
      buffs: [],
      ...props,
    });
  }
}

/**
 * 全身甲
 */
export class FullPlateArmor extends Armor {
  constructor(props: TypedArmorProps) {
    super({
      weight: 50,
      armorType: ArmorType.HeavyArmor,
      AC: 12,
      buffs: [],
      ...props,
    });
  }
}

export const standardChainmail = new Chainmail({
  name: 'Chainmail',
  description: '',
});

export const standardFullPlateArmor = new FullPlateArmor({
  name: 'Full Plate Armor',
  description: '',
});
