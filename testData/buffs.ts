import {Buff} from '../src/character/buff.js';
import {HookType} from '../src/utils/hook.js';

export const BookOfBlessings = new Buff({
  id: 'BookOfBlessings',
  name: 'Book of Blessings',
  from: '',
  description: 'Add 1 AB and 1 AC',
  expires: Date.now(),
  hooks: [{
    type: HookType.AB,
    func: pre => pre + 1,
  }, {
    type: HookType.AC,
    func: pre => pre + 1,
  }],
});