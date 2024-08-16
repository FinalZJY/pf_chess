import {Buff} from '../character/buff.js';
import randomUUID, {UUID} from '../utils/randomUUID.js';
import {Item, ItemType} from './item.js';

export enum AccessoryType {
  Headgear = 'Headgear', // 头饰
  Necklace = 'Necklace', // 项链
  Ring = 'Ring', // 戒指
  Belt = 'Belt', // 腰带
}

export interface TypedAccessoryProps {
  weight?: number;
  name: string;
  description?: string;
  buffs?: Buff[];
}

export interface AccessoryProps {
  weight: number;
  accessoryType: AccessoryType;
  name: string;
  description?: string;
  buffs: Buff[];
}

export class Accessory implements Item {
  id: UUID;
  itemType = ItemType.Accessory;
  weight: number;
  accessoryType: AccessoryType;
  name: string;
  description?: string;
  buffs: Buff[];

  // todo 最大敏捷加值、奥数失败率

  constructor({weight, accessoryType, name, description, buffs}: AccessoryProps) {
    this.id = randomUUID();
    this.weight = weight;
    this.accessoryType = accessoryType;
    this.name = name;
    this.description = description ?? '';
    this.buffs = buffs ?? [];
  }
}

export class Headgear extends Accessory {
  constructor(props: TypedAccessoryProps) {
    super({
      accessoryType: AccessoryType.Headgear,
      weight: 1,
      buffs: [],
      ...props,
    });
  }
}

export class Necklace extends Accessory {
  constructor(props: TypedAccessoryProps) {
    super({
      accessoryType: AccessoryType.Necklace,
      weight: 1,
      buffs: [],
      ...props,
    });
  }
}

export class Ring extends Accessory {
  constructor(props: TypedAccessoryProps) {
    super({
      accessoryType: AccessoryType.Ring,
      weight: 0.5,
      buffs: [],
      ...props,
    });
  }
}

export class Belt extends Accessory {
  constructor(props: TypedAccessoryProps) {
    super({
      accessoryType: AccessoryType.Belt,
      weight: 2,
      buffs: [],
      ...props,
    });
  }
}

export const standardHeadgear = new Headgear({
  name: 'Headgear',
  description: '',
});

export const standardNecklace = new Necklace({
  name: 'Necklace',
  description: '',
});

export const standardRing = new Ring({
  name: 'Ring',
  description: '',
});

export const standardBelt = new Belt({
  name: 'Belt',
  description: '',
});
