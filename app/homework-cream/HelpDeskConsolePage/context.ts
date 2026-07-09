"use client";

import {
  createContext,
  createElement,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type HelpDeskSettingsContextValue = {
  settingsOpen: boolean;
  denseMode: boolean;
  refreshIntervalSeconds: number;
  refreshIntervalLabel: string;
  showResolvedTickets: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  setDenseMode: (value: boolean) => void;
  setRefreshIntervalSeconds: (value: number) => void;
  setShowResolvedTickets: (value: boolean) => void;
};

export const HelpDeskSettingsContext =
  createContext<HelpDeskSettingsContextValue | null>(null);

export function HelpDeskSettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [denseMode, setDenseMode] = useState(false);
  const [showResolvedTickets, setShowResolvedTickets] = useState(true);
  const [refreshIntervalSeconds, setRefreshIntervalSeconds] = useState(5);
  const [refreshIntervalLabel, setRefreshIntervalLabel] = useState(
    `Last refreshed 1 second ago`,
  );

  useEffect(() => {
    const id = setInterval(() => {
      const label = `Last refreshed ${refreshIntervalSeconds} seconds ago`;
      setRefreshIntervalLabel(label);
      console.log(label);
    }, refreshIntervalSeconds * 1000);

    return () => {
      console.log("cleaning up refresh interval");
      clearInterval(id);
    };
  }, [refreshIntervalSeconds]);

  const value: HelpDeskSettingsContextValue = {
    settingsOpen,
    denseMode,
    refreshIntervalSeconds,
    refreshIntervalLabel,
    showResolvedTickets,
    openSettings: () => setSettingsOpen(true),
    closeSettings: () => setSettingsOpen(false),
    setDenseMode,
    setRefreshIntervalSeconds,
    setShowResolvedTickets,
  };

  return createElement(HelpDeskSettingsContext.Provider, { value }, children);
}

export const useHelpDeskSettings = () => {
  const context = useContext(HelpDeskSettingsContext);
  if (!context) {
    throw new Error(
      "useHelpDeskSettings must be used within a HelpDeskSettingsProvider",
    );
  }
  return context;
};
