import {Effect, Hook} from '../utils/hook.js';

export class Buff extends Effect {
  id: string;
  name: string;
  from: string;
  expires: number | null; // ms
  description?: string;

  constructor({id, name, from, expires = null, description, hooks}: {
    id: string;
    name: string;
    from: string;
    expires?: number | null;
    description?: string;
    hooks?: Hook<any>[];
  }) {
    super(hooks);
    this.id = id;
    this.name = name;
    this.from = from;
    this.expires = expires;
    this.description = description;
  }

  active() {
    if (this.expires === null) {
      return true;
    }
    return Date.now() < this.expires;
  }
}