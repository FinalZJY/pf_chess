import {isNodejs} from './env.js';

const randomUUID = isNodejs ? (await import('node:crypto')).randomUUID : window.crypto.randomUUID;

export type UUID = ReturnType<typeof randomUUID>;

export default randomUUID;
