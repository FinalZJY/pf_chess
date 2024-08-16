import {Feature} from '../src/character/feature.js';
import {HookType} from '../src/utils/hook.js';

export const WeaponSpecialization = new Feature({
  id: 'WeaponSpecialization',
  name: 'Weapon Specialization',
  from: 'Class',
  description: 'Add 1 AB',
  hooks: [{
    type: HookType.AB,
    func: pre => pre + 1,
  }],
});