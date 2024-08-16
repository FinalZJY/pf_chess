export enum ClassType {
  /** 战士 **/
  Warrior = 'Warrior',
  /** 游侠 **/
  Rangers = 'Rangers',
  /** 圣武士 **/
  Paladin = 'Paladin',
  /** 游荡者 **/
  Rogue = 'Rogue',
  /** 牧师 **/
  Clerics = 'Clerics',
  /** 德鲁伊 **/
  Druids = 'Druids',
  /** 武僧 **/
  Monk = 'Monk',
  /** 吟游诗人 **/
  Bard = 'Bard',
  /** 巫师 **/
  Wizard = 'Wizard',
}

export enum BABType {
  /** 每2级提供1点 BAB **/
  Low = 'Low',
  /** 每3级提供2点 BAB **/
  Medium = 'Medium',
  /** 每1级提供1点 BAB **/
  High = 'High',
}

const ClassMeta: Record<ClassType, { hitDiceSides: number; BABType: BABType }> = {
  Warrior: {
    hitDiceSides: 10,
    BABType: BABType.High,
  },
  Paladin: {
    hitDiceSides: 10,
    BABType: BABType.High,
  },
  Rangers: {
    hitDiceSides: 10,
    BABType: BABType.High,
  },
  Rogue: {
    hitDiceSides: 8,
    BABType: BABType.Medium,
  },
  Clerics: {
    hitDiceSides: 8,
    BABType: BABType.Medium,
  },
  Druids: {
    hitDiceSides: 8,
    BABType: BABType.Medium,
  },
  Monk: {
    hitDiceSides: 8,
    BABType: BABType.Medium,
  },
  Bard: {
    hitDiceSides: 6,
    BABType: BABType.Medium,
  },
  Wizard: {
    hitDiceSides: 6,
    BABType: BABType.Low,
  },
};

export class ClassLevel {
  classType: ClassType;
  level: number;
  hitDiceSides: number;

  constructor(classType: ClassType, level: number) {
    this.classType = classType;
    this.level = level;
    this.hitDiceSides = ClassMeta[classType].hitDiceSides;
  }

  BAB() {
    const type = ClassMeta[this.classType].BABType;
    if (type === BABType.High) {
      return this.level;
    } else if (type === BABType.Medium) {
      return Math.floor(this.level * 2 / 3);
    } else if (type === BABType.Low) {
      return Math.floor(this.level / 2);
    } else {
      return 0;
    }
  }
}
