import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { initialTickets, Ticket } from "./types";

type SettingOptions = {
  denseMode: boolean;
  showResolvedTickets: boolean;
  refreshTimeInterval: number;
};

const defaultSetting: SettingOptions = {
  denseMode: true,
  showResolvedTickets: false,
  refreshTimeInterval: 30,
};

const SAVED_SETTING_KEY = "react-homework-setting";

function getInitialSettings(): SettingOptions {
  if (typeof window === "undefined") {
    return defaultSetting;
  }

  const savedSetting = window.localStorage.getItem(SAVED_SETTING_KEY);
  if (!savedSetting) {
    return defaultSetting;
  }

  try {
    return { ...defaultSetting, ...JSON.parse(savedSetting) };
  } catch {
    return defaultSetting;
  }
}

export const TicketContext = createContext<{
  allTickets: Ticket[];
  setAllTickets: Dispatch<SetStateAction<Ticket[]>>;
  denseMode: boolean;
  setDenseMode: Dispatch<SetStateAction<boolean>>;
  showResolvedTickets: boolean;
  setShowResolvedTickets: Dispatch<SetStateAction<boolean>>;
  refreshTimeInterval: number;
  setRefreshTimeInterval: Dispatch<SetStateAction<number>>;
} | null>(null);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [allTickets, setAllTickets] = useState<Ticket[]>(initialTickets);
  const [settings, setSettings] = useState<SettingOptions>(getInitialSettings);
  const { denseMode, showResolvedTickets, refreshTimeInterval } = settings;

  useEffect(() => {
    localStorage.setItem(SAVED_SETTING_KEY, JSON.stringify(settings));
  }, [settings]);

  function setDenseMode(value: SetStateAction<boolean>) {
    setSettings((previous) => ({
      ...previous,
      denseMode:
        typeof value === "function" ? value(previous.denseMode) : value,
    }));
  }

  function setShowResolvedTickets(value: SetStateAction<boolean>) {
    setSettings((previous) => ({
      ...previous,
      showResolvedTickets:
        typeof value === "function"
          ? value(previous.showResolvedTickets)
          : value,
    }));
  }

  function setRefreshTimeInterval(value: SetStateAction<number>) {
    setSettings((previous) => ({
      ...previous,
      refreshTimeInterval:
        typeof value === "function"
          ? value(previous.refreshTimeInterval)
          : value,
    }));
  }

  return (
    <TicketContext.Provider
      value={{
        allTickets,
        setAllTickets,
        denseMode,
        setDenseMode,
        showResolvedTickets,
        setShowResolvedTickets,
        refreshTimeInterval,
        setRefreshTimeInterval,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTicketContext() {
  const context = useContext(TicketContext);

  if (!context) {
    throw new Error("useTicketContext must be used within a TicketProvider");
  }

  return context;
}
