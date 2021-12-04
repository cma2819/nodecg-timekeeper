import { Run, Segment, Timer, TimeSpan } from 'livesplit-core'
import { Time } from './Time';

export type TimeStatus = 'in_progress' | 'paused' | 'finished';

const TimerPhase = {
  notRunning: 0,
  running: 1,
  ended: 2,
  paused: 3,
} as const;


export class Timekeeper {

  protected livesplit: Timer;

  constructor(initialSeconds?: number) {
    const run = Run.new();
    run.pushSegment(Segment.new('Finish'));

    const timer = Timer.new(run);
    if (!timer) {
      throw new Error('Failed to create livesplit timer!');
    }

    timer.setLoadingTimes(TimeSpan.fromSeconds(0));
    if (initialSeconds && initialSeconds > 0) {
      this.initExistsTime(timer, initialSeconds);
    }
    timer.initializeGameTime();

    this.livesplit = timer;
  }

  start(): void {
    const phase = this.livesplit.currentPhase();
    this.livesplit.start();
    this.livesplit.pause();
    this.livesplit.setGameTime(TimeSpan.fromSeconds(0));
    this.livesplit.resume();

    if (phase !== TimerPhase.notRunning) {
      throw new Error('This would be nothing happened. You need to reset to start timer.');
    }
  }

  pause(): Time {
    const phase = this.livesplit.currentPhase();
    this.livesplit.pause();

    if (phase !== TimerPhase.running) {
      throw new Error('This would be nothing happened. You can pause timer only when it\'s running.');
    }

    return this.currentTime;
  }

  resume(): void {
    const phase = this.livesplit.currentPhase();
    this.livesplit.resume();

    if (phase !== TimerPhase.paused) {
      throw new Error('This would be nothing happened. You can resume timer only when it\'s paused.');
    }
  }

  finish(): Time {
    this.livesplit.split();
    
    const time = this.currentTime;
    this.livesplit.reset(false);
    
    return time;
  }

  initExistsTime(timer: Timer, initSeconds: number): Timer {
    timer.start();
    timer.pause();
    timer.setGameTime(TimeSpan.fromSeconds(initSeconds));
    return timer;
  }

  get status(): TimeStatus {
    switch (this.livesplit.currentPhase()) {
    case TimerPhase.paused:
      return 'paused';
    case TimerPhase.running:
      return 'in_progress';
    default:
      return 'finished';
    }
  }

  get currentTime(): Time {
    const totalSeconds = this.currentTimeSeconds;

    return Time.make(totalSeconds);
  }

  get currentTimeSeconds(): number {
    console.log(this.livesplit.currentTime().gameTime()?.totalSeconds());
    return this.livesplit.currentTime().gameTime()?.totalSeconds() || 0;
  }
}