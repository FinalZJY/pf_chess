import {CapitalDungeon} from '../../../map/instance/capital.js';
import {Position} from '../../../map/position.js';
import {Neutral} from '../../alignment.js';
import {ClassLevel, ClassType} from '../../classType.js';
import {Combatant} from '../../combatant.js';
import {RaceType} from '../../race.js';

export const FirstPlayer = new Combatant({
  name: 'Unnamed Player',
  position: new Position({
    location: CapitalDungeon,
    coordinate: {
      x: 0,
      y: 2,
    },
  }),
  ability: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  alignment: Neutral,
  classLevels: [new ClassLevel(ClassType.Warrior, 1)],
  raceType: RaceType.Human,
});