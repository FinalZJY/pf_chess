import {SomewhereCombat} from '../../testData/combats.js';
import {stopAllScheduler} from '../utils/scheduler.js';
import {rollActionOrder} from './initiative.js';

const result = rollActionOrder(SomewhereCombat);

console.log('Order: ', JSON.stringify(result));

stopAllScheduler();
