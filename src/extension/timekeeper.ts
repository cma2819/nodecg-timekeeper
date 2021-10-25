import { NodeCG } from './nodecg';
import { Timekeeper } from './lib/Timekeeper';
import { Time } from './lib/Time';

export const timekeeper = (nodecg: NodeCG): void => {

  const tickRateMs = nodecg.bundleConfig.tickRateMs || 100;

  const timekeepingRep = nodecg.Replicant('timekeeping', {
    defaultValue: {
      time: {
        display: '00:00',
        rawInSecond: 0,
      },
      status: 'finished',
    }
  });
  const historyRep = nodecg.Replicant('history', {
    defaultValue: [],
  });

  const timekeeper = new Timekeeper;

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