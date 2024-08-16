import type {Combatant} from '../character/combatant.js';
import type {Item} from '../item/item.js';
import type {Magic} from '../magic/magic.js';

export type DamageSource = Combatant | Item | Magic;

export enum DamageType {
  /** 挥砍 */
  Slashing = 'Slashing',
  /** 穿刺 */
  Piercing = 'Piercing',
  /** 钝击 */
  Bludgeoning = 'Bludgeoning',
  /** 火 */
  Fire = 'Fire',
  /** 寒 */
  Cold = 'Cold',
  /** 电 */
  Electricity = 'Electricity',
  /** 酸 */
  Acid = 'Acid',
  /** 音波 */
  Sonic = 'Sonic',
  /** 正能量 */
  PositiveEnergy = 'PositiveEnergy',
  /** 负能量 */
  NegativeEnergy = 'NegativeEnergy',
  /** 精神 */
  Psychic = 'Psychic',
  /** 力场 */
  Force = 'Force ',
}

export const PhysicalDamage = [
  DamageType.Slashing,
  DamageType.Piercing,
  DamageType.Bludgeoning,
  DamageType.Force,
];

export const ElementalDamage = [
  DamageType.Fire,
  DamageType.Cold,
  DamageType.Electricity,
  DamageType.Acid,
];

export const EnergyDamage = [
  DamageType.PositiveEnergy,
  DamageType.NegativeEnergy,
];

export const MagicDamage = [
  ...ElementalDamage,
  ...EnergyDamage,
  DamageType.Sonic,
  DamageType.Psychic,
];

export class Damage {
  value: number;
  type: DamageType;
  source?: DamageSource;

  constructor(value: number, type: DamageType, source?: DamageSource) {
    this.value = value;
    this.type = type;
    this.source = source;
  }
}

export class DamagePack {
  damages: Damage[];

  constructor(damages: Damage[]) {
    this.damages = damages;
  }

  totalValue() {
    return this.damages.reduce((pre, cur) => pre + cur.value, 0);
  }

  reduceByType() {
    const typedValue = this.damages.reduce((pre, cur) => {
      pre[cur.type] = (pre[cur.type] ?? 0) + cur.value;
      return pre;
    }, {} as Record<DamageType, number>);
    return Object.keys(typedValue).map((key) => new Damage(typedValue[key as DamageType], key as DamageType));
  }
}