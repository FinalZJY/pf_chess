import type {Combatant} from '../character/combatant.js';
import type {Item} from '../item/item.js';
import type {Magic} from '../magic/magic.js';

export type BonusSource = Combatant | Item | Magic;

export enum BonusType {
  Racial = 'Racial', // 种族
  Class = 'Class', // 职业
  Armor = 'Armor', // 盔甲
  Shield = 'Shield', // 盾牌
  Deflection = 'Deflection', // 偏斜
  Dodge = 'Dodge', // 闪避
  NaturalArmor = 'NaturalArmor', // 天生防御
  Sacred = 'Sacred', // 崇圣
  Skill = 'Skill', // 技能
  Magic = 'Magic', // 魔法
  Size = 'Size', // 体型
  Circumstance = 'Circumstance', // 环境
  Resistance = 'Resistance', // 抗力
  Enhancement = 'Enhancement', // 增强
  Insight = 'Insight', // 洞察
  Luck = 'Luck', // 幸运
  DualWield = 'DualWield', // 双持武器减值
  Strength = 'Strength', // 力量
  Dexterity = 'Dexterity', // 敏捷
  Constitution = 'Constitution', // 体质
  Intelligence = 'Intelligence', // 智力
  Wisdom = 'Wisdom', // 感知
  Charisma = 'Character', // 魅力
}

export class Bonus {
  type?: BonusType;
  value: number;
  source?: BonusSource;

  constructor(value: number, type?: BonusType, source?: BonusSource) {
    this.value = value;
    this.type = type;
    this.source = source;
  }
}

export class BonusPack {
  bonuses: Bonus[];

  constructor(bonuses: Bonus[]) {
    this.bonuses = bonuses;
  }

  totalValue() {
    const typedValue = this.bonuses.reduce((pre, cur) => {
      if (cur.type) {
        // 同类型加值取最大
        pre[cur.type] = Math.max(pre[cur.type], cur.value);
      } else {
        // 无类型加值叠加
        pre.untyped = (pre.untyped ?? 0) + cur.value;
      }
      return pre;
    }, {} as Record<BonusType | 'untyped', number>);
    return this.bonuses.reduce((pre, cur) => pre + cur.value, 0);
  }
}