import {UUID} from '../utils/randomUUID.js';

export enum ItemType {
  Weapon = 'Weapon',
  Armor = 'Armor',
  Consumables = 'Consumables', // 消耗品
  Accessory = 'Accessory', // 饰品
  Materials = 'Materials', // 材料
  RareItem = 'RareItem', // 珍贵物品
}

export interface Item {
  id: UUID;
  itemType: ItemType;
  name: string;
  description?: string;
  weight: number;
}