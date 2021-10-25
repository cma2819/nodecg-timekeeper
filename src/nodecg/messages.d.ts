import { Time } from '../extension/lib/Time';

export type MessageMap = {
  'start': {
    error: Error;
  },
  'pause': {
    result: Time;
    error: Error;
  },
  'resume': {
    error: Error;
  },
  'finish': {
    result: Time;
    error: Error;
  },
  'reset-history': {
    error: Error;
  },
};
