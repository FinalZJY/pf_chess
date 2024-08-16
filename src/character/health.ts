import {Damage, DamagePack} from '../damage/damage.js';
import logger from '../logger/index.js';
import {Hook, HookType} from '../utils/hook.js';
import type {Combatant} from './combatant.js';

export function standardAliveCheck(combatant: Combatant) {
  // 生命值小于体质，则死亡
  return combatant.health.healthPoint >= -combatant.ability.constitution;
}

export class Health {
  combatant: Combatant;
  isAlive: boolean;
  healthPoint: number;
  tempHealthPoint = 0;

  constructor(combatant: Combatant) {
    this.combatant = combatant;
    this.isAlive = true;
    this.healthPoint = this.maxHp();
  }

  maxHp() {
    // todo: 似乎需要通过掷生命骰来决定生命上限，每次升级时需要把投掷结果记录下来
    const hitDice = this.combatant.classLevels.reduce((total, classLevels) => total + (classLevels.hitDiceSides + this.combatant.abilityModifiers().constitution) * classLevels.level, 0);
    const bonus = this.combatant.totalBonus(HookType.MaxHp);
    return hitDice + bonus;
  }

  /**
   * 即死
   */
  kill() {
    this.isAlive = false;
    this.healthPoint = Math.min(-2 * this.combatant.ability.constitution, this.healthPoint);
  }

  aliveCheck() {
    const aliveCheckFunc = this.combatant.getHooks(HookType.AliveCheck).reduce((pre, hook: Hook<(combatant: Combatant) => boolean>) => hook.func(pre), standardAliveCheck);
    return aliveCheckFunc(this.combatant);
  }

  receiveDamage(damage: Damage | DamagePack) {
    const pack = this.combatant.getHooks(HookType.ReceiveDamage).reduce(
      (pre, hook: Hook<DamagePack>) => hook.func(pre),
      damage instanceof DamagePack ? damage : new DamagePack([damage]),
    );
    pack.reduceByType().forEach(d => {
      this.damageToHealth(d.value);
    });
  }

  private damageToHealth(damageValue: number) {
    let left = damageValue;
    const tempHealthPointDamage = Math.min(this.tempHealthPoint, left);
    this.tempHealthPoint = this.tempHealthPoint - tempHealthPointDamage;
    left = left - tempHealthPointDamage;
    this.healthPoint = this.healthPoint - left;
    if (!this.aliveCheck()) {
      this.isAlive = false;
      logger.log(`${this.combatant.name} died.`);
    }
  }
}