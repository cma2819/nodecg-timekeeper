import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Configschema } from '../../nodecg/generated/configschema';

type Props = {
  children: ReactNode
};

export const BundleConfigContext = createContext<Configschema>({});

export const BundleConfigProvider = ({children}: Props) => {

  const [config, setConfig] = useState<Configschema>({});

  useEffect(() => {
    setConfig(nodecg.bundleConfig);
  }, [])

  return (
    <BundleConfigContext.Provider value={config}>
      { children }
    </BundleConfigContext.Provider>
  )
}