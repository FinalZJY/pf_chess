import {Baphomet, Godfrey} from '../../testData/combatants.js';
import {SomewhereCombat} from '../../testData/combats.js';
import {stopAllScheduler} from '../utils/scheduler.js';

const log = () => {
  console.log('totalLevel', Baphomet.totalLevel());
  console.log('hitDice', Baphomet.totalHitDice());
  console.log('BAB', Baphomet.BAB());
  console.log('AB', Baphomet.AB());
  console.log('AC', Baphomet.AC());
}

for (; Baphomet.health.isAlive;) {
  Godfrey.attack(Baphomet, SomewhereCombat);
}

stopAllScheduler();