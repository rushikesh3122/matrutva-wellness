"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultSettings, type StoreSettings } from "@/lib/settings";

const SettingsContext = createContext<StoreSettings>(defaultSettings);

/** Makes the store settings (from /admin) available to client components. */
export function SettingsProvider({ value, children }: { value: StoreSettings; children: ReactNode }) {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => useContext(SettingsContext);
