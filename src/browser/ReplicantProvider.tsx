import { clone } from 'lodash';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { History, Timekeeping } from '../nodecg/generated';

interface Replicants {
  timekeeping: Timekeeping;
  history: History;
}

const defaultValues: Replicants = {
  timekeeping: {
    time: {
      display: '00:00',
      rawInSecond: 0,
    },
    status: 'finished',
  },
  history: [],
};

export const ReplicantContext = createContext<Replicants>(defaultValues);

type Props = {
  children: ReactNode;
}

export const ReplicantProvider = ({ children }: Props) => {

  const [timekeeping, setTimekeeping] = useState<Timekeeping>(defaultValues.timekeeping);
  const [history, setHistory] = useState<History>(defaultValues.history);

  useEffect(() => {
    nodecg.Replicant('timekeeping').on('change', (newVal) => {
      setTimekeeping(clone(newVal));
    });
    nodecg.Replicant('history').on('change', (newVal) => {
      setHistory(clone(newVal));
    });
  }, []);

  return (
    <ReplicantContext.Provider value={{
      timekeeping,
      history,
    }}>
      { children }
    </ReplicantContext.Provider>
  );
}