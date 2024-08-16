import type {Combatant} from '../character/combatant.js';
import type {CombatContext} from '../combat/context.js';
import logger, {color} from '../logger/index.js';
import {Hook, HookType} from '../utils/hook.js';
import {initiativeCheck, reduceRollProperties, RollProperties} from './roll.js';

export interface InitiativeCheckResult {
  combatant: Combatant;
  result: number;
}

/**
 * roll dices for initiative check and return the combatants in order
 * @param combatContext
 */
export function rollActionOrder(combatContext: CombatContext): InitiativeCheckResult[] {
  const combatants = combatContext.allCombatants();
  const initiativeCheckResults = combatants.map((combatant) => rollOnce(combatContext, combatant));
  initiativeCheckResults.sort((a, b) => b.result - a.result);
  return initiativeCheckResults;
}

export function rollOnce(combatContext: CombatContext, combatant: Combatant): InitiativeCheckResult {
  const checkResult = {
    combatant,
    result: 0,
  };
  const dexModifier = (combatant.ability.dexterity - 10) / 2;
  const allRollProperties = combatant.getHooks(HookType.InitiativeCheck).map((hook: Hook<RollProperties>) => hook.func({}));
  const rollProperties = reduceRollProperties(allRollProperties);
  checkResult.result = initiativeCheck(dexModifier, rollProperties);
  logger.log(`${combatant.name} initiative check: ${color.yellow(checkResult.result)}.`);
  return checkResult;
}
