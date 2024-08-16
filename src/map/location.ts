export class Location {
  name: string;
  parent?: Location;
  children: Location[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addChild(child: Location) {
    child.parent = this;
    this.children.push(child);
  }
}