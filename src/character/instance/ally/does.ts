import {CapitalDungeon} from '../../../map/instance/capital.js';
import {Position} from '../../../map/position.js';
import {ChaoticNeutral} from '../../alignment.js';
import {ClassLevel, ClassType} from '../../classType.js';
import {Combatant} from '../../combatant.js';
import {RaceType} from '../../race.js';

export const Does = new Combatant({
  name: 'Does',
  position: new Position({
    location: CapitalDungeon,
    coordinate: {
      x: 6,
      y: 5,
    },
  }),
  ability: {
    strength: 10,
    dexterity: 18,
    constitution: 8,
    intelligence: 10,
    wisdom: 10,
    charisma: 14,
  },
  alignment: ChaoticNeutral,
  classLevels: [new ClassLevel(ClassType.Rogue, 5)],
  raceType: RaceType.Human,
});