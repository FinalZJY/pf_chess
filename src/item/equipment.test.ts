import {Ring, standardBelt, standardHeadgear, standardNecklace, standardRing} from './accessories.js';
import {standardChainmail, standardFullPlateArmor} from './armor.js';
import {Equipment} from './equipment.js';
import {standardLongbow, standardLongSword, standardLongSwordPlus1, standardShortSword} from './weapon.js';

const equipment = new Equipment();

const logStatus = () => {
  console.log(`mainHand: ${equipment.mainHand?.name}`);
  console.log(`offHand: ${equipment.offHand?.name}`);
  console.log(`armor: ${equipment.armor?.name}`);
  console.log(`headgear: ${equipment.headgear?.name}`);
  console.log(`necklace: ${equipment.necklace?.name}`);
  console.log(`belt: ${equipment.belt?.name}`);
  console.log(`ring1: ${equipment.ring1?.name}`);
  console.log(`ring2: ${equipment.ring2?.name}`);
  console.log('');
};

equipment.wear(standardLongSword);
equipment.wear(standardFullPlateArmor);
equipment.wear(standardHeadgear);
equipment.wear(standardNecklace);
equipment.wear(standardBelt);
equipment.wear(standardRing);
logStatus();

equipment.wear(standardLongbow);
equipment.wear(standardChainmail);
equipment.wear(new Ring({
  name: 'Iron Ring',
}));
logStatus();

equipment.wear(standardShortSword);
logStatus();

equipment.changeSlot(standardLongSwordPlus1, 'offHand');
logStatus();
