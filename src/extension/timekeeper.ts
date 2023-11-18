import { NodeCG } from './nodecg';
import { Timekeeper } from './lib/Timekeeper';
import { Time } from './lib/Time';

export const timekeeper = (nodecg: NodeCG): void => {

  console.log(nodecg.bundleConfig);

  const tickRateMs = nodecg.bundleConfig.tickRateMs || 100;
  const enabledCountdown = nodecg.bundleConfig.countdown?.enabled || false;
  const offsetSeconds = nodecg.bundleConfig.countdown?.offsetSeconds || 0;
  const display = enabledCountdown ? Time.make(offsetSeconds).display : '00:00';
  const rawInSecond = enabledCountdown ? offsetSeconds : 0;

  const timekeepingRep = nodecg.Replicant('timekeeping', {
    defaultValue: {
      time: {
        display: display,
        rawInSecond: rawInSecond,
      },
      status: 'finished',
    }
  });
  const historyRep = nodecg.Replicant('history', {
    defaultValue: [],
  });

  const timekeeper = enabledCountdown ?
    new Timekeeper(offsetSeconds - timekeepingRep.value.time.rawInSecond, offsetSeconds)
    : new Timekeeper(timekeepingRep.value.time.rawInSecond);
  if (timekeepingRep.value.status === 'in_progress') {
    timekeeper.resume();
  }

  const tick = () => {
    const time = timekeeper.currentTime;
    const status = timekeeper.status;

    timekeepingRep.value = {time, status};
  }

  setInterval(tick, tickRateMs);

  const resetHistory = () => {
    historyRep.value = [];
  }

  const addHistory = (time: Time, now: Date) => {
    historyRep.value.push({
      time,
      finishedAt: now.valueOf(),
    });
  }

  nodecg.listenFor('start', (_, cb) => {
    if (cb && cb.handled) {
      return;
    }

    try {
      timekeeper.start();
    } catch (e) {
      if (cb && e instanceof Error) {
        cb(e);
      }
    }

    cb && cb(null);
  });

  nodecg.listenFor('pause', (_, cb) => {
    if (cb && cb.handled) {
      return;
    }

    try {
      const time = timekeeper.pause();
      cb && cb(null, time);
    } catch (e) {
      if (cb && e instanceof Error) {
        cb(e);
      }
    }

  });

  nodecg.listenFor('resume', (_, cb) => {
    if (cb && cb.handled) {
      return;
    }

    try {
      timekeeper.resume();
    } catch (e) {
      if (cb && e instanceof Error) {
        cb(e);
      }
    }
    
    cb && cb(null);
  });

  nodecg.listenFor('finish', (_, cb) => {
    if (cb && cb.handled) {
      return;
    }

    try {
      const finishedTime = timekeeper.finish();
      addHistory(finishedTime, new Date);
      cb && cb(null, finishedTime);
    } catch (e) {
      if (cb && e instanceof Error) {
        cb(e);
      }
    }
  });

  nodecg.listenFor('reset-history', (_, cb) => {
    if (cb && cb.handled) {
      return;
    }

    resetHistory();

    cb && cb(null);
  });
}