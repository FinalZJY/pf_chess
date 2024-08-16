import type {Combatant} from '../character/combatant.js';
import type {BonusPack} from '../check/bonus.js';
import type {DamageDice} from '../check/dice/Dice.js';
import type {CombatContext} from '../combat/context.js';
import type {DamagePack} from '../damage/damage.js';
import type {Weapon} from '../item/weapon.js';

export enum HookType {
  AB = 'AB',
  AC = 'AC',
  MaxHp = 'MaxHp',
  AttackTimes = 'AttackTimes',
  AttackRoll = 'AttackRoll',
  UnderAttackRoll = 'UnderAttackRoll',
  AttackDamageBonus = 'AttackDamageBonus', // 造成伤害时的加值，伤害类型与武器相同
  AttackDamageDice = 'AttackDamageDice', // 决定使用什么伤害骰
  AttackDamage = 'AttackDamage', // 造成伤害时的额外伤害，伤害类型由伤害来源决定，不同来源类型相同的伤害会合并
  DamageRoll = 'DamageRoll',
  ReceiveDamageRoll = 'ReceiveDamageRoll',
  InitiativeCheck = 'InitiativeCheck',
  AliveCheck = 'AliveCheck',
  ReceiveDamage = 'ReceiveDamage',
}

export type HookContext = {
  enemy?: Combatant,
  weapon?: Weapon | null,
  combatContext?: CombatContext,
} & Record<string, unknown>;

export interface Hook<T> {
  type: HookType;
  func: (pre: T, hookContext?: HookContext) => T;
}

export interface AttackBonusHook extends Hook<BonusPack> {
  type: HookType.AB;
  func: (pre: BonusPack, hookContext?: HookContext) => BonusPack;
}

export interface AttackDamageBonusHook extends Hook<BonusPack> {
  type: HookType.AttackDamageBonus;
  func: (pre: BonusPack, hookContext?: HookContext) => BonusPack;
}

export interface AttackDamageDiceHook extends Hook<DamageDice> {
  type: HookType.AttackDamageDice;
  func: (pre: DamageDice, hookContext?: HookContext) => DamageDice;
}

export interface AttackDamageHook extends Hook<DamagePack> {
  type: HookType.AttackDamage;
  func: (pre: DamagePack, hookContext?: HookContext) => DamagePack;
}

export class Effect {
  hooks: Hook<any>[];

  constructor(hooks: Hook<any>[] = []) {
    this.hooks = hooks;
  }

  addHook<T>(hook: Hook<T>) {
    this.hooks.push(hook);
  }

  removeHook<T>(hook: Hook<T>) {
    const index = this.hooks.indexOf(hook);
    if (index > -1) {
      this.hooks.splice(index, 1);
    }
  }
}