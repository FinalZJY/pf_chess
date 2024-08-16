import type {Combatant} from '../character/combatant.js';

export interface CampProps {
  name?: string;
  combatants: Combatant[];
  hostileCamp?: Camp[];
  alliedCamp?: Camp[];
}

export class Camp {
  name?: string;
  combatants: Combatant[];
  hostileCamp: Camp[]; // 敌对
  alliedCamp: Camp[]; // 同盟

  constructor({name, combatants, hostileCamp, alliedCamp}: CampProps) {
    this.name = name;
    this.combatants = combatants;
    this.hostileCamp = hostileCamp ?? [];
    this.alliedCamp = alliedCamp ?? [];
  }
}