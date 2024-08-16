const DEFAULT_PERIOD = 100; //ms

export const activeScheduler: Scheduler[] = [];

export class Scheduler {
  func: () => void;
  period: number;
  interval: number | null = null;

  constructor(func: () => void, period: number = DEFAULT_PERIOD) {
    this.func = func;
    this.period = period;

    this.start();
  }

  start() {
    activeScheduler.push(this);
    this.interval = (setInterval(this.func, this.period) as unknown as number);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = null;
    if (activeScheduler.indexOf(this) >= 0) {
      activeScheduler.splice(activeScheduler.indexOf(this), 1);
    }
  }
}

export function stopAllScheduler() {
  activeScheduler.forEach(scheduler => scheduler.stop());
}