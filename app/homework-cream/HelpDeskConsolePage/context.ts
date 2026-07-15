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
  showResolvedTickets: boolean;
  isRefreshing: boolean;
  lastRefreshLabel: string;
  openSettings: () => void;
  closeSettings: () => void;
  setDenseMode: (value: boolean) => void;
  setRefreshIntervalSeconds: (value: number) => void;
  setShowResolvedTickets: (value: boolean) => void;
  setIsRefreshing: (value: boolean) => void;
  setIsRefreshingState(value: boolean): void;
};

export const HelpDeskSettingsContext =
  createContext<HelpDeskSettingsContextValue | null>(null);

export function HelpDeskSettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const localStorageName = "helpdesk-settings";
  const savedSettings = getSavedSettings();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [denseMode, setDenseMode] = useState(
    () => savedSettings.denseMode ?? false,
  );
  const [showResolvedTickets, setShowResolvedTickets] = useState(
    () => savedSettings.showResolvedTickets ?? true,
  );
  const [refreshIntervalSeconds, setRefreshIntervalSeconds] = useState(
    () => savedSettings.refreshIntervalSeconds ?? 5,
  );
  const [secondsSinceLastRefresh, setSecondsSinceLastRefresh] = useState(
    () => savedSettings.secondsSinceLastRefresh ?? 0,
  );
  const [lastRefreshLabel] = useState(`Last refreshed ${secondsSinceLastRefresh} ${
    secondsSinceLastRefresh === 1 ? "second" : "seconds"
  } ago`)

  // Refresh data
  useEffect(() => {
    if (isRefreshing) {
      return;
    }

    const id = window.setInterval(() => {
      setIsRefreshingState(true);
    }, refreshIntervalSeconds * 1000);

    return () => {
      setSecondsSinceLastRefresh(0);
      console.log("cleaning up interval 1");
      window.clearInterval(id);
    };
  }, [refreshIntervalSeconds, isRefreshing]);

  // Count up SecondsSinceLastRefresh
  useEffect(() => {
    if (isRefreshing) {
      return;
    }

    const id = window.setInterval(() => {
      setSecondsSinceLastRefresh((currentSeconds: number) => currentSeconds + 1);
    }, 1000);

    return () => {
      console.log("cleaning up interval 2");
      window.clearInterval(id);
    };
  }, [isRefreshing]);

  // Click refresh button
  function setIsRefreshingState(value: boolean) {
    console.log("refresh started");
    setIsRefreshing(value);

    if (!value) {
      return;
    }

    window.setTimeout(() => {
      setIsRefreshing(false);
      console.log("refresh finished");
    }, 1000);
  }

  // Local Storage
  function getSavedSettings() {
    if (typeof window === "undefined") {
      return {};
    }

    try {
      return JSON.parse(localStorage.getItem(localStorageName) ?? "{}");
    } catch {
      return {};
    }
  }

  useEffect(() => {
    localStorage.setItem(
      localStorageName,
      JSON.stringify({
        denseMode,
        showResolvedTickets,
        refreshIntervalSeconds,
        secondsSinceLastRefresh,
      }),
    );
  }, [
    denseMode,
    showResolvedTickets,
    refreshIntervalSeconds,
    secondsSinceLastRefresh,
  ]);

  const value: HelpDeskSettingsContextValue = {
    settingsOpen,
    denseMode,
    refreshIntervalSeconds,
    showResolvedTickets,
    isRefreshing,
    lastRefreshLabel,
    openSettings: () => setSettingsOpen(true),
    closeSettings: () => setSettingsOpen(false),
    setDenseMode,
    setRefreshIntervalSeconds,
    setShowResolvedTickets,
    setIsRefreshing,
    setIsRefreshingState,
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
