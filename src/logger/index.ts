import chalk, {ChalkInstance, supportsColor} from 'chalk';

const logger = console;

export const color: ChalkInstance = supportsColor ? chalk : Object.setPrototypeOf((...text: unknown[]) => {
  // if the logger doesn't support color, return the original text.
  return text.join('');
}, chalk);

export default logger;
