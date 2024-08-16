import {Location} from './location.js';

export interface PositionProps {
  location: Location;
  coordinate: {
    x: number;
    y: number;
  };
}

export class Position {
  location: Location;
  coordinate: {
    x: number;
    y: number;
  };

  constructor({location, coordinate}: PositionProps) {
    this.location = location;
    this.coordinate = coordinate;
  }

  distanceTo(target: Position) {
    return distance(this, target);
  }
}

export function distance(a: Position, b: Position) {
  if (a.location !== b.location) {
    // 暂不计算跨地图之间的距离
    return Infinity;
  }
  return ManhattanDistance(a, b);
}

/**
 * 笛卡尔距离
 * d = sqrt[(x2-x1)² + (y2-y1)²]
 */
function EuclideanDistance(a: Position, b: Position) {
  return Math.sqrt(Math.pow(a.coordinate.x - b.coordinate.x, 2) + Math.pow(a.coordinate.y - b.coordinate.y, 2));
}

/**
 * 曼哈顿距离
 * d = |x2-x1| + |y2-y1|
 */
function ManhattanDistance(a: Position, b: Position) {
  return Math.abs(a.coordinate.x - b.coordinate.x) + Math.abs(a.coordinate.y - b.coordinate.y);
}
