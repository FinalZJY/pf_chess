/**
 * Roll a y-sided dice once, return the value.
 */
export default (y: number) => {
  return Math.floor(Math.random() * y) + 1;
};