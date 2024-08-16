import logger, {color} from '../logger/index.js';
import Dice, {
  AbilityCheckDice,
  AttackDice,
  ConcentrationCheckDice,
  DamageDice,
  DiceType,
  GeneralDiceSizes,
  InitiativeDice,
  SavingThrowDice,
  SkillCheckDice
} from './dice/Dice.js';

export interface RollProperties {
  goodLuck?: boolean; // roll twice and return the highest number.
  badLuck?: boolean; // roll twice and return the lowest number.
}

/**
 * 将多个 RollProperties 合并为一个。 最终为好运骰还是坏运骰取决于哪个数量多。
 * @param origin
 */
export function reduceRollProperties(origin: RollProperties[]) {
  const result: RollProperties = {};
  let luck = 0;
  origin.forEach((properties: RollProperties) => {
    if (properties.goodLuck) {
      luck++;
    } else if (properties.badLuck) {
      luck--;
    }
  });
  if (luck > 0) {
    result.goodLuck = true;
  } else if (luck < 0) {
    result.badLuck = true;
  }
  return result;
}

function getTotalBonus(bonus?: number | number[]) {
  if (!bonus) {
    return 0;
  }
  return typeof bonus === 'number' ? bonus : bonus.reduce((a, b) => a + b, 0);
}

export function check(dice: Dice, DC: number, bonus?: number | number[], properties?: RollProperties) {
  const rollResult = roll(dice, properties);
  const D20CheckDice = [
    DiceType.AttackDice,
    DiceType.SavingThrow,
    DiceType.SkillCheckDice,
    DiceType.AbilityCheckDice,
    DiceType.ConcentrationCheckDice,
  ];
  if (D20CheckDice.includes(dice.type)) {
    if (rollResult === 1) {
      logger.log(`Check result: ${color.red('Fail')}(Roll 1)`);
      return false;
    } else if (rollResult === 20) {
      logger.log(`Check result: ${color.green('Success')}(Roll 20)`);
      return true;
    }
  }
  const totalBonus = getTotalBonus(bonus);
  const total = rollResult + totalBonus;
  const isSuccess = total >= DC;
  logger.log(`Check result: ${color.green(total)}(Roll ${rollResult} + ${totalBonus}). DC: ${DC}.`, isSuccess ? color.green('Success') : color.red('Fail'));
  return isSuccess;
}

function roll(dice: Dice, properties?: RollProperties) {
  let rollResult: number;
  if (properties?.goodLuck) {
    rollResult = Math.max(dice.roll(), dice.roll());
  } else if (properties?.badLuck) {
    rollResult = Math.min(dice.roll(), dice.roll());
  } else {
    rollResult = dice.roll();
  }
  return rollResult;
}

/**
 * 攻击检定
 */
export function attackRoll(AC: number, AB: number | number[], properties?: RollProperties) {
  const attackDice = new AttackDice();
  return check(attackDice, AC, AB, properties);
}

/**
 * 豁免检定
 */
export function savingThrow(DC: number, bonus?: number | number[], properties?: RollProperties) {
  const savingThrowDice = new SavingThrowDice();
  return check(savingThrowDice, DC, bonus, properties);
}

/**
 * 技能检定
 */
export function skillCheck(DC: number, bonus?: number | number[], properties?: RollProperties) {
  const skillCheckDice = new SkillCheckDice();
  return check(skillCheckDice, DC, bonus, properties);
}

/**
 * 先攻检定
 */
export function initiativeCheck(bonus?: number | number[], properties?: RollProperties) {
  const initiativeDice = new InitiativeDice();
  const rollResult = roll(initiativeDice, properties);
  return rollResult + getTotalBonus(bonus);
}

/**
 * 属性检定
 */
export function abilityCheck(DC: number, bonus?: number | number[], properties?: RollProperties) {
  const abilityCheckDice = new AbilityCheckDice();
  return check(abilityCheckDice, DC, bonus, properties);
}

/**
 * 专注检定
 */
export function concentrationCheck(DC: number, bonus?: number | number[], properties?: RollProperties) {
  const concentrationCheckDice = new ConcentrationCheckDice();
  return check(concentrationCheckDice, DC, bonus, properties);
}

/**
 * 伤害检定
 */
export function damageRoll(diceSides: GeneralDiceSizes | DamageDice, bonus?: number | number[], properties?: RollProperties) {
  const damageDice = diceSides instanceof DamageDice ? diceSides : new DamageDice(diceSides);
  const rollResult = roll(damageDice, properties);
  const totalBonus = getTotalBonus(bonus);
  const total = rollResult + totalBonus;
  logger.log(`Damage: ${color.red(total)}(Roll ${rollResult} + ${totalBonus})`);
  return total;
}