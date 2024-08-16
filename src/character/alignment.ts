export enum YAlignment {
  Good = 'Good',
  Neutral = 'Neutral',
  Evil = 'Evil',
}

export enum XAlignment {
  Lawful = 'Lawful',
  Neutral = 'Neutral',
  Chaotic = 'Chaotic',
}

const MAX_VALUE = 60;

export default class Alignment {
  xValue: number = 0;
  yValue: number = 0;

  constructor({xValue = 0, yValue = 0}: { xValue?: number, yValue?: number }) {
    this.xValue = xValue;
    this.yValue = yValue;
  }

  xAlignment() {
    if (this.xValue > (MAX_VALUE / 3)) {
      return XAlignment.Lawful;
    } else if (this.xValue < -(MAX_VALUE / 3)) {
      return XAlignment.Chaotic;
    } else {
      return XAlignment.Neutral;
    }
  }

  yAlignment() {
    if (this.yValue > (MAX_VALUE / 3)) {
      return YAlignment.Good;
    } else if (this.yValue < -(MAX_VALUE / 3)) {
      return YAlignment.Evil;
    } else {
      return YAlignment.Neutral;
    }
  }

  goodBehavior(value: number = 1) {
    this.xValue += value;
  }

  evilBehavior(value: number = 1) {
    this.xValue -= value;
  }

  lawfulBehavior(value: number = 1) {
    this.yValue += value;
  }

  chaoticBehavior(value: number = 1) {
    this.yValue -= value;
  }

  toString() {
    if (this.xAlignment() === XAlignment.Neutral && this.yAlignment() === YAlignment.Neutral) {
      return XAlignment.Neutral;
    }
    return `${this.xAlignment()} ${this.yAlignment()}`;
  }
}

export const Neutral = new Alignment({xValue: 0, yValue: 0});
export const LawfulGood = new Alignment({xValue: 40, yValue: 40});
export const LawfulNeutral = new Alignment({xValue: 40, yValue: 0});
export const LawfulEvil = new Alignment({xValue: 40, yValue: -40});
export const ChaoticGood = new Alignment({xValue: -40, yValue: 40});
export const ChaoticNeutral = new Alignment({xValue: -40, yValue: 0});
export const ChaoticEvil = new Alignment({xValue: -40, yValue: -40});