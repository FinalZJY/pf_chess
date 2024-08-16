import {Camp} from '../src/combat/camp.js';
import {CombatContext} from '../src/combat/context.js';
import {Baphomet, Godfrey, Player1} from './combatants.js';
import {SomewhereCity} from './location.js';

const playerCamp = new Camp({
  name: 'players',
  combatants: [Player1],
});
const crusaderCamp = new Camp({
  name: 'Crusader',
  combatants: [Godfrey],
});
const baphometCamp = new Camp({
  name: 'Baphomet Camp',
  combatants: [Baphomet],
});
playerCamp.hostileCamp?.push(baphometCamp);
baphometCamp.hostileCamp?.push(playerCamp);
playerCamp.alliedCamp?.push(crusaderCamp);
crusaderCamp.alliedCamp?.push(playerCamp);
crusaderCamp.hostileCamp?.push(baphometCamp);
baphometCamp.hostileCamp?.push(crusaderCamp);


export const SomewhereCombat = new CombatContext({
  location: SomewhereCity,
  camps: [playerCamp, crusaderCamp, baphometCamp],
});