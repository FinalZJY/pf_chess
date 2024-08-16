import {ChaoticEvil, LawfulGood, Neutral} from '../src/character/alignment.js';
import {ClassLevel, ClassType} from '../src/character/classType.js';
import {Combatant} from '../src/character/combatant.js';
import {RaceType} from '../src/character/race.js';
import {CharacterSize} from '../src/character/size.js';
import {Position} from '../src/map/position.js';
import {BookOfBlessings} from './buffs.js';
import {WeaponSpecialization} from './features.js';
import {SomewhereCity} from './location.js';

export const Player1 = new Combatant({
  name: 'player',
  position: new Position({
    location: SomewhereCity,
    coordinate: {
      x: 5,
      y: 5,
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

export const Godfrey = new Combatant({
  name: 'Godfrey',
  position: new Position({
    location: SomewhereCity,
    coordinate: {
      x: 6,
      y: 5,
    },
  }),
  ability: {
    strength: 24,
    dexterity: 12,
    constitution: 18,
    intelligence: 10,
    wisdom: 10,
    charisma: 18,
  },
  alignment: LawfulGood,
  classLevels: [new ClassLevel(ClassType.Paladin, 14)],
  raceType: RaceType.Human,
});

export const Baphomet = new Combatant({
  name: 'Baphomet',
  position: new Position({
    location: SomewhereCity,
    coordinate: {
      x: 6,
      y: 6,
    },
  }),
  size: CharacterSize.Large,
  ability: {
    strength: 20,
    dexterity: 40,
    constitution: 35,
    intelligence: 18,
    wisdom: 45,
    charisma: 26,
  },
  alignment: ChaoticEvil,
  classLevels: [new ClassLevel(ClassType.Wizard, 36)],
  raceType: RaceType.Demon,
});
Baphomet.features.push(WeaponSpecialization);
Baphomet.buffs.push(BookOfBlessings);
