import type {Combatant} from '../character/combatant.js';
import {InitiativeCheckResult, rollActionOrder, rollOnce} from '../check/initiative.js';
import logger, {color} from '../logger/index.js';
import {Location} from '../map/location.js';
import randomUUID, {UUID} from '../utils/randomUUID.js';
import {Camp} from './camp.js';

export interface CombatContextProps {
  location: Location;
  camps: Camp[];
}

export class CombatContext {
  id: UUID;
  location: Location;
  camps: Camp[];
  combatantOrder: InitiativeCheckResult[];

  constructor({location, camps}: CombatContextProps) {
    this.id = randomUUID();
    this.location = location;
    this.camps = camps;
    this.combatantOrder = rollActionOrder(this);
  }

  allCombatants() {
    return this.camps.flatMap(camp => camp.combatants);
  }

  findEnemies(combatant: Combatant): Combatant[] {
    const camp = this.camps.find(c => c.combatants.includes(combatant));
    if (!camp) {
      logger.warn(`Can not find enemies. Combatant ${color.yellow(combatant.name)}(${combatant.id}) is not in this combat.`);
      return [];
    }
    return camp.hostileCamp.flatMap(c => c.combatants).filter(enemy => enemy.health.isAlive);
  }

  findNearestCombatant(combatant: Combatant, maxDistance = Infinity): Combatant | undefined {
    const enemies = this.findEnemies(combatant).filter(c => c.position.distanceTo(combatant.position) < maxDistance);
    enemies.sort((a, b) => a.position.distanceTo(combatant.position) - b.position.distanceTo(combatant.position));
    return enemies[0];
  }

  addCombatants(camp: Camp, ...combatants: Combatant[]) {
    (combatants ?? []).forEach((combatant: Combatant) => {
      const order = rollOnce(this, combatant);
      this.combatantOrder.push(order);
      camp.combatants.push(combatant);
    });
    this.combatantOrder.sort((a, b) => b.result - a.result);
  }
}