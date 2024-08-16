import {Effect, Hook} from '../utils/hook.js';

export class Feature extends Effect {
  id: string;
  name: string;
  from: string;
  description?: string;

  constructor({id, name, from, description, hooks}: {
    id: string;
    name: string;
    from: string;
    description?: string;
    hooks?: Hook<any>[]
  }) {
    super(hooks);
    this.id = id;
    this.name = name;
    this.from = from;
    this.description = description;
  }
}