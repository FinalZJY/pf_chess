import Dy from './Dy.js';
import xDy from './xDy.js';

export enum GeneralDiceSizes {
  D3 = 3,
  D4 = 4,
  D6 = 6,
  D8 = 8,
  D10 = 10,
  D12 = 12,
  D20 = 20,
}

export enum DiceType {
  General = 'General',
  HitDice = 'HitDice',
  AttackDice = 'AttackDice',
  DamageDice = 'DamageDice',
  SavingThrow = 'SavingThrow',
  SkillCheckDice = 'SkillCheckDice',
  InitiativeDice = 'InitiativeDice',
  AbilityCheckDice = 'AbilityCheckDice',
  ConcentrationCheckDice = 'ConcentrationCheckDice',
  RandomEventDice = 'RandomEventDice',
}

export type DiceSizes = GeneralDiceSizes | number;

class DiceError extends Error {
  readonly sides: DiceSizes;
  readonly type?: DiceType;

  constructor(message: string, {sides, type}: { sides: DiceSizes, type?: DiceType }) {
    super(message);
    this.sides = sides;
    this.type = type;
  }
}

export default class Dice {
  sides: DiceSizes;
  type: DiceType;

  constructor(sides: DiceSizes, type: DiceType = DiceType.General) {
    this.sides = sides;
    const D20Dice = [
      DiceType.AttackDice,
      DiceType.SavingThrow,
      DiceType.SkillCheckDice,
      DiceType.InitiativeDice,
      DiceType.AbilityCheckDice,
      DiceType.ConcentrationCheckDice,
    ];
    if (D20Dice.includes(type) && sides !== GeneralDiceSizes.D20) {
      throw new DiceError(`${type} should be D20.`, {sides, type});
    }
    this.type = type;
  }

  roll() {
    return Dy(this.sides);
  }

  rollMultiTimes(times: number) {
    return xDy(times, this.sides);
  }

  // Returns a Dice instance that is one size larger than the current dice.
  grow() {
    const enumValues = Object.values(GeneralDiceSizes).filter(v => typeof v === 'number');
    const currentIndex = enumValues.indexOf(this.sides);
    if (this.sides in GeneralDiceSizes) {
      return new Dice(enumValues[currentIndex + 1]);
    } else {
      return this;
    }
  }
}

export class AttackDice extends Dice {
  constructor() {
    super(GeneralDiceSizes.D20, DiceType.AttackDice);
  }
}

export class DamageDice extends Dice {
  constructor(diceSides: GeneralDiceSizes) {
    super(diceSides, DiceType.DamageDice);
  }
}

export class SavingThrowDice extends Dice {
  constructor() {
    super(GeneralDiceSizes.D20, DiceType.SavingThrow);
  }
}

export class SkillCheckDice extends Dice {
  constructor() {
    super(GeneralDiceSizes.D20, DiceType.SkillCheckDice);
  }
}

export class InitiativeDice extends Dice {
  constructor() {
    super(GeneralDiceSizes.D20, DiceType.InitiativeDice);
  }
}

export class AbilityCheckDice extends Dice {
  constructor() {
    super(GeneralDiceSizes.D20, DiceType.AbilityCheckDice);
  }
}

export class ConcentrationCheckDice extends Dice {
  constructor() {
    super(GeneralDiceSizes.D20, DiceType.ConcentrationCheckDice);
  }
}
