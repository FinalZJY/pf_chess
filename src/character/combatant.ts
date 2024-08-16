import {Bonus, BonusPack, BonusType} from '../check/bonus.js';
import {DamageDice} from '../check/dice/Dice.js';
import {attackRoll, damageRoll, reduceRollProperties, RollProperties} from '../check/roll.js';
import {CombatContext} from '../combat/context.js';
import {Damage, DamagePack} from '../damage/damage.js';
import {Equipment} from '../item/equipment.js';
import {fist, Weapon} from '../item/weapon.js';
import logger, {color} from '../logger/index.js';
import {Magic} from '../magic/magic.js';
import {
  AttackBonusHook,
  AttackDamageBonusHook,
  AttackDamageDiceHook,
  AttackDamageHook,
  Hook,
  HookContext,
  HookType
} from '../utils/hook.js';
import {Scheduler} from '../utils/scheduler.js';
import {Buff} from './buff.js';
import Character, {CharacterProps} from './character.js';
import {ClassLevel} from './classType.js';
import {Feature} from './feature.js';
import {Health} from './health.js';

export type Ability = {
  // 力量
  strength: number;
  // 敏捷
  dexterity: number;
  // 体质
  constitution: number;
  // 智力
  intelligence: number;
  // 感知
  wisdom: number;
  // 魅力
  charisma: number;
};

export interface CombatantProps extends CharacterProps {
  ability: Ability;
  classLevels: ClassLevel[];
}

export const BASE_AC = 10;

export class Combatant extends Character {
  ability: Ability;
  preparedSpells: Magic[] = [];
  classLevels: ClassLevel[];
  features: Feature[] = [];
  buffs: Buff[] = [];
  health: Health;
  equipment: Equipment = new Equipment();

  scheduler: Scheduler;

  constructor({ability, classLevels, ...rest}: CombatantProps) {
    super(rest);
    this.ability = ability;
    this.classLevels = classLevels;
    this.health = new Health(this);

    // todo 替换全局调度器
    this.scheduler = new Scheduler(this.removeExpireBuffs.bind(this));
  }

  totalLevel() {
    return this.classLevels.reduce((total, classLevel) => total + classLevel.level, 0);
  }

  totalHitDice() {
    return this.totalLevel();
  }

  BAB() {
    return this.classLevels.reduce((total, classLevel) => total + classLevel.BAB(), 0);
  }

  AB({
    BAB, enemy, weapon, attackIndex
  }: {
    BAB?: number;
    enemy?: Combatant;
    weapon?: Weapon | null;
    attackIndex?: number;
  } = {}) {
    let bonusPack = new BonusPack([this.attackModifier()]);
    if (weapon?.enhancement && weapon?.enhancement > 0) {
      bonusPack.bonuses.push(new Bonus(weapon.enhancement, BonusType.Enhancement, weapon));
    }
    if (this.equipment.isDualWield()) {
      if (weapon?.isLightWeapon) {
        if (weapon === this.equipment.mainHand) {
          bonusPack.bonuses.push(new Bonus(-6, BonusType.DualWield, this));
        } else if (weapon === this.equipment.offHand) {
          bonusPack.bonuses.push(new Bonus(-10, BonusType.DualWield, this));
        }
      } else {
        if (weapon === this.equipment.mainHand) {
          bonusPack.bonuses.push(new Bonus(-8, BonusType.DualWield, this));
        } else if (weapon === this.equipment.offHand) {
          bonusPack.bonuses.push(new Bonus(-12, BonusType.DualWield, this));
        }
      }
    }
    bonusPack = (this.getHooks(HookType.AB) as AttackBonusHook[])
      .reduce((pre, hook) => hook.func(pre, {enemy, weapon, attackIndex}), bonusPack);
    return (BAB ?? this.BAB()) + bonusPack.totalValue();
  }

  attackModifier() {
    // todo 敏系
    return new Bonus(this.abilityModifiers().strength, BonusType.Strength, this);
  }

  damageModifier() {
    // todo 敏系
    return new Bonus(this.abilityModifiers().strength, BonusType.Strength, this);
  }

  abilityModifiers() {
    return {
      strength: Math.floor((this.ability.strength - 10) / 2),
      dexterity: Math.floor((this.ability.dexterity - 10) / 2),
      constitution: Math.floor((this.ability.constitution - 10) / 2),
      intelligence: Math.floor((this.ability.intelligence - 10) / 2),
      wisdom: Math.floor((this.ability.wisdom - 10) / 2),
      charisma: Math.floor((this.ability.charisma - 10) / 2),
    };
  }

  AC(enemy?: Combatant) {
    const bonus = this.totalBonus(HookType.AC, {enemy});
    return BASE_AC + this.abilityModifiers().dexterity + bonus;
  }

  /**
   * 整轮攻击
   */
  attack(target: Combatant, combatContext: CombatContext) {
    const bonusTimes = this.totalBonus(HookType.AttackTimes, {enemy: target});
    const normalTimes = Math.floor((this.BAB() - 1) / 5) + 1;
    const totalTimes = bonusTimes + normalTimes;
    const attackBABs = [];
    for (let index = 1; index <= bonusTimes; index++) {
      const BAB = this.BAB();
      attackBABs.push(BAB);
    }
    for (let index = 1; index <= normalTimes; index++) {
      const BAB = this.BAB() - 5 * (index - 1);
      attackBABs.push(BAB);
    }
    for (let index = 1; index <= totalTimes; index++) {
      const BAB = attackBABs[index - 1];
      const mainHandWeapon = this.equipment.mainHand ?? fist;
      const offHandWeapon = this.equipment.offHand ?? fist;
      // 目标死亡后重新寻找目标
      let finalTarget = (index === 1 || target.health.isAlive) ? target : combatContext.findNearestCombatant(this, mainHandWeapon.attackRange);
      if (!finalTarget) {
        // 找不到可攻击目标了，结束攻击
        break;
      }
      logger.log(`Attack ${color.yellow(index)}/${color.yellow(totalTimes)}. BAB: ${color.yellow(BAB)}`);
      if (this.equipment.isDualWield()) {
        this.attackOnce(finalTarget, BAB, mainHandWeapon, combatContext, index);
        // 单次攻击后也需要重新检查目标
        finalTarget = target.health.isAlive ? finalTarget : combatContext.findNearestCombatant(this, mainHandWeapon.attackRange);
        if (!finalTarget) {
          break;
        }
        this.attackOnce(finalTarget, BAB, offHandWeapon, combatContext, 2 * index + 1);
      } else {
        this.attackOnce(finalTarget, BAB, mainHandWeapon, combatContext, index);
      }
    }
  }

  attackOnce(target: Combatant, BAB: number, weapon: Weapon, combatContext: CombatContext, attackIndex: number) {
    const AB = this.AB({BAB, enemy: target, weapon, attackIndex});
    const AC = target.AC(this);
    const attackProperties = [
      ...this.getHooks(HookType.AttackRoll),
      ...target.getHooks(HookType.UnderAttackRoll),
    ].map((hook: Hook<RollProperties>) => hook.func({}));
    const isHit = attackRoll(AC, AB, reduceRollProperties(attackProperties));

    if (isHit) {
      const damageContext = {
        enemy: target,
        weapon,
        combatContext,
      };

      // 计算伤害加值
      let bonusPack = new BonusPack([this.damageModifier()]);
      if (weapon?.enhancement && weapon?.enhancement > 0) {
        bonusPack.bonuses.push(new Bonus(weapon.enhancement, BonusType.Enhancement, weapon));
      }
      bonusPack = (this.getHooks(HookType.AttackDamageBonus) as AttackDamageBonusHook[])
        .reduce((pre, hook) => hook.func(pre, damageContext), bonusPack);

      // 确定伤害骰
      const damageDice = (this.getHooks(HookType.AttackDamageDice) as AttackDamageDiceHook[])
        .reduce((pre, hook) => hook.func(pre, damageContext), new DamageDice(weapon.diceSides));

      // 掷伤害骰
      const damageProperties = [
        ...this.getHooks(HookType.DamageRoll),
        ...target.getHooks(HookType.ReceiveDamageRoll),
      ].map((hook: Hook<RollProperties>) => hook.func({}));
      const weaponDamage = damageRoll(damageDice, bonusPack.totalValue(), reduceRollProperties(damageProperties));

      // 计算额外伤害
      let damagePack = new DamagePack([new Damage(weaponDamage, weapon.damageType, weapon)]);
      damagePack = (this.getHooks(HookType.AttackDamage) as AttackDamageHook[])
        .reduce((pre, hook) => hook.func(pre, damageContext), damagePack);

      target.health.receiveDamage(damagePack);
    }
  }

  destroy() {
    this.scheduler.stop();
  }

  getHooks(hookType: HookType) {
    return [
      ...this.features.flatMap(feature => feature.hooks),
      ...this.buffs.flatMap(buff => buff.hooks),
      ...this.equipment.allBuffs().flatMap(buff => buff.hooks),
    ].filter((hook) => hook.type === hookType);
  }

  totalBonus(hookType: HookType, hookContext?: HookContext) {
    return this.getHooks(hookType).reduce((total, hook: Hook<number>) => hook.func(total, hookContext), 0);
  }

  private removeExpireBuffs() {
    this.buffs = this.buffs.filter((buff) => buff.active());
  }
}