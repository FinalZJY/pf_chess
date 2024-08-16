import Dy from './Dy.js';

const y = 10;
const totalTimes = 10000;
const numTimes: Record<string | number, number> = {};
for (let i = 0; i < totalTimes; i++) {
  const result = Dy(10);
  if (numTimes[result]) {
    numTimes[result] = numTimes[result] + 1;
  } else {
    numTimes[result] = 1;
  }
}

const avg = totalTimes / y;
const maxDeviation = 0.1;
for (let times of Object.values(numTimes)) {
  if (Math.abs(times - avg) > avg * maxDeviation) {
    console.error(
      'Unexpected times for Dy.',
      `y:${y},totalTimes=${totalTimes}`,
      `expected: [${avg - avg * maxDeviation},${avg + avg * maxDeviation}]`,
      `actual: ${times}`,
    );
    break;
  }
}

console.log(JSON.stringify(numTimes));
