export const isNodejs = typeof window === 'undefined';
export const isProd = process?.env?.NODE_ENV === 'production';

export default {
  isNodejs,
  isProd,
};