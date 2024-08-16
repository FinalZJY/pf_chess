import {Buff} from '../character/buff.js';
import {DiceSizes, GeneralDiceSizes} from '../check/dice/Dice.js';
import {damageRoll} from '../check/roll.js';
import {Damage, DamagePack, DamageType} from '../damage/damage.js';
import {Hook, HookType} from '../utils/hook.js';
import randomUUID, {UUID} from '../utils/randomUUID.js';
import {Item, ItemType} from './item.js';

export enum WeaponType {
  Fist = 'Fist',
  LongSword = 'LongSword',
  ShortSword = 'ShortSword',
  Longbow = 'Longbow',
}

export interface TypedWeaponProps {
  weight?: number;
  name: string;
  description?: string;
  enhancement?: number;
  diceSides?: DiceSizes;
  buffs?: Buff[];
}

export interface WeaponProps {
  attackRange?: number;
  isRangedWeapon: boolean;
  isLightWeapon: boolean;
  isDoubleHandedWeapon: boolean;
  weight: number;
  weaponType: WeaponType;
  name: string;
  description?: string;
  twoHanded?: boolean;
  enhancement?: number;
  damageType: DamageType;
  diceSides: DiceSizes;
  buffs: Buff[];
}

export class Weapon implements Item {
  id: UUID;
  itemType = ItemType.Weapon;
  attackRange: number;
  isRangedWeapon: boolean;
  isLightWeapon: boolean;
  isDoubleHandedWeapon: boolean;
  weight: number;
  weaponType: WeaponType;
  name: string;
  description?: string;
  twoHanded?: boolean;
  enhancement: number;
  damageType: DamageType;
  diceSides: DiceSizes;
  buffs: Buff[];

  constructor({
    attackRange,
    isRangedWeapon,
    isLightWeapon,
    isDoubleHandedWeapon,
    weight,
    weaponType,
    name,
    description,
    twoHanded,
    enhancement,
    damageType,
    diceSides,
    buffs
  }: WeaponProps) {
    this.id = randomUUID();
    this.attackRange = attackRange ?? 5;
    this.isRangedWeapon = isRangedWeapon;
    this.isLightWeapon = isLightWeapon;
    this.isDoubleHandedWeapon = isDoubleHandedWeapon;
    this.weight = weight;
    this.weaponType = weaponType;
    this.name = name;
    this.description = description ?? '';
    this.twoHanded = twoHanded ?? false;
    this.enhancement = enhancement ?? 0;
    this.damageType = damageType;
    this.diceSides = diceSides;
    this.buffs = buffs ?? [];
  }
}

export class Fist extends Weapon {
  constructor(props: TypedWeaponProps) {
    super({
      isRangedWeapon: false,
      isLightWeapon: true,
      isDoubleHandedWeapon: false,
      weight: 0,
      weaponType: WeaponType.Fist,
      enhancement: 0,
      damageType: DamageType.Bludgeoning,
      diceSides: GeneralDiceSizes.D3,
      buffs: [],
      ...props,
    });
  }
}

export class LongSword extends Weapon {
  constructor(props: TypedWeaponProps) {
    super({
      isRangedWeapon: false,
      isLightWeapon: false,
      isDoubleHandedWeapon: false,
      weight: 2,
      weaponType: WeaponType.LongSword,
      enhancement: 0,
      damageType: DamageType.Slashing,
      diceSides: GeneralDiceSizes.D8,
      buffs: [],
      ...props,
    });
  }
}

export class ShortSword extends Weapon {
  constructor(props: TypedWeaponProps) {
    super({
      isRangedWeapon: false,
      isLightWeapon: false,
      isDoubleHandedWeapon: false,
      weight: 1,
      weaponType: WeaponType.ShortSword,
      enhancement: 0,
      damageType: DamageType.Slashing,
      diceSides: GeneralDiceSizes.D6,
      buffs: [],
      ...props,
    });
  }
}

export class Longbow extends Weapon {
  constructor(props: TypedWeaponProps) {
    super({
      isRangedWeapon: true,
      isLightWeapon: false,
      isDoubleHandedWeapon: true,
      attackRange: 60,
      weight: 2,
      weaponType: WeaponType.Longbow,
      enhancement: 0,
      damageType: DamageType.Piercing,
      diceSides: GeneralDiceSizes.D8,
      buffs: [],
      ...props,
    });
  }
}

export const fist = new Fist({
  name: 'Fist',
  description: 'When fighting unarmed, the typical weapon die for an unarmed strike is a d3, representing damage dealt with punches, kicks, and other forms of non-weapon attacks.',
});

export const standardLongSword = new LongSword({
  name: 'Long Sword',
  description: '',
});

export const standardLongSwordPlus1 = new LongSword({
  name: 'Long Sword +1',
  description: '',
  enhancement: 1,
});

export const standardShortSword = new ShortSword({
  name: 'Short Sword',
  description: '',
});

export const standardLongbow = new Longbow({
  name: 'Longbow',
  description: '',
});

export const fireLongSword = new LongSword({
  name: 'Fire Long Sword',
  description: 'A long sword.The attack deals an additional 1D4 points of fire damage.',
  buffs: [
    new Buff({
      id: 'FireWeapon',
      name: 'Fire Weapon',
      from: 'Fire Long Sword',
      description: 'The attack deals an additional 1D4 points of fire damage.',
      expires: null,
      hooks: [{
        type: HookType.AttackDamage,
        func: (pre, {
          enemy,
          weapon,
          combatContext,
        } = {}) => {
          const damageValue = damageRoll(GeneralDiceSizes.D4);
          pre.damages.push(new Damage(damageValue, DamageType.Fire, weapon ?? undefined));
          return pre;
        },
      }] as Hook<DamagePack>[],
    }),
  ],
});