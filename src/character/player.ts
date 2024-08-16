import {Combatant, CombatantProps} from './combatant.js';

export class PlayerRole extends Combatant {
  constructor({...rest}: CombatantProps) {
    super(rest);
  }
}