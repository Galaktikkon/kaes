// app/providers.tsx
"use client";

import game from "@/src/State/Game";
import { createContext, useContext, useEffect, useState } from "react";

const ConfigContext = createContext<ConfigData | null>(null);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [configData, setConfigData] = useState<ConfigData | null>(null);

  useEffect(() => {
    (async () => {
      const config = await (
        await fetch(process.env.NEXT_PUBLIC_API_HOST + "/api/load_config/")
      ).json();
      setConfigData(config);
      game.addConfig(config);
    })();
  }, []);

  return (
    <ConfigContext.Provider value={configData}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfigContext() {
  return useContext(ConfigContext) as ConfigData;
}
