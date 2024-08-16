import {Buff} from '../character/buff.js';
import {Accessory, Belt, Headgear, Necklace, Ring} from './accessories.js';
import {Armor} from './armor.js';
import {Item} from './item.js';
import {Weapon} from './weapon.js';

type EquipmentSlots = {
  [K in keyof Equipment]: Equipment[K] extends Function ? never : K;
}[keyof Equipment];

export class Equipment {
  mainHand: Weapon | null = null;
  offHand: Weapon | null = null;
  armor: Armor | null = null;
  headgear: Headgear | null = null;
  necklace: Necklace | null = null;
  belt: Belt | null = null;
  ring1: Ring | null = null;
  ring2: Ring | null = null;

  constructor() {
  }

  weapon() {
    return {
      mainHand: this.mainHand,
      offHand: this.offHand,
    };
  }

  accessories() {
    return {
      headgear: this.headgear,
      necklace: this.necklace,
      belt: this.belt,
      ring1: this.ring1,
      ring2: this.ring2,
    };
  }

  /**
   * 双持武器，即两只手各持一把武器
   */
  isDualWield() {
    return this.offHand && this.mainHand !== this.offHand;
  }

  changeSlot(item: Item, slot: EquipmentSlots) {
    this.undress(item);
    switch (slot) {
      case 'mainHand': {
        this.addWeapon(item, slot);
        break;
      }
      case 'offHand': {
        this.addWeapon(item, slot);
        break;
      }
      case 'armor': {
        if (item instanceof Armor) {
          this.armor = item;
        } else {
          throw new Error(`Can not set equipment weapon ${slot} slot.`);
        }
        break;
      }
      case 'headgear': {
        if (item instanceof Headgear) {
          this.headgear = item;
        } else {
          throw new Error(`Can not set equipment weapon ${slot} slot.`);
        }
        break;
      }
      case 'necklace': {
        if (item instanceof Necklace) {
          this.necklace = item;
        } else {
          throw new Error(`Can not set equipment weapon ${slot} slot.`);
        }
        break;
      }
      case 'belt': {
        if (item instanceof Belt) {
          this.belt = item;
        } else {
          throw new Error(`Can not set equipment weapon ${slot} slot.`);
        }
        break;
      }
      case 'ring1': {
        if (item instanceof Ring) {
          this.ring1 = item;
        } else {
          throw new Error(`Can not set equipment weapon ${slot} slot.`);
        }
        break;
      }
      case 'ring2': {
        if (item instanceof Ring) {
          this.ring2 = item;
        } else {
          throw new Error(`Can not set equipment weapon ${slot} slot.`);
        }
        break;
      }
    }
  }

  wear(item: Item) {
    this.undress(item);
    if (item instanceof Weapon) {
      this.addWeapon(item, 'mainHand');
    } else if (item instanceof Armor) {
      this.armor = item;
    } else if (item instanceof Headgear) {
      this.headgear = item;
    } else if (item instanceof Necklace) {
      this.necklace = item;
    } else if (item instanceof Belt) {
      this.belt = item;
    } else if (item instanceof Ring) {
      if (this.ring1 && !this.ring2) {
        this.ring2 = item;
      } else {
        this.ring1 = item;
      }
    }
  }

  undress(item: Item) {
    Object.keys(this).forEach(key => {
      const slot = key as EquipmentSlots;
      if (this[slot] === item) {
        this[slot] = null;
      }
    });
  }

  allBuffs() {
    return Object.values(this).flatMap(section => {
      if (!section) {
        return [] as Buff[];
      }
      if (section?.buffs) {
        return (section.buffs ?? []) as Buff[];
      } else {
        return Object.values(section).flatMap((e) => (e as Weapon | Accessory | null)?.buffs ?? []);
      }
    });
  }

  private addWeapon(item: Item, slot: 'mainHand' | 'offHand') {
    if (item instanceof Weapon) {
      if (item.isDoubleHandedWeapon) {
        this.mainHand = item;
        this.offHand = item;
      } else {
        if (this.mainHand?.isDoubleHandedWeapon) {
          this.offHand = null;
        }
        if (slot === 'mainHand') {
          this.mainHand = item;
        } else {
          this.offHand = item;
        }
      }
    } else {
      throw new Error(`Can not set equipment weapon ${slot} slot.`);
    }
  }
}