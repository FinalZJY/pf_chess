import Dy from './Dy.js';

/**
 * Roll a y-sided dice x times, return the total value.
 */
export default (x: number, y: number) => {
  let total = 0;
  for (let i = 1; i <= x; i++) {
    total += Dy(y);
  }
  return total;
};