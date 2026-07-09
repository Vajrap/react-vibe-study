import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { initialTickets, Ticket, TicketPriority, TicketStatus } from "./types";

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
  filteredTickets: Ticket[];
  setAllTickets: Dispatch<SetStateAction<Ticket[]>>;
  searchText: string;
  statusFilter: TicketStatus[];
  priorityFilter: TicketPriority[];
  isApplyFilter: boolean;
  handleClearFilter: () => void;
  applyFilter: (
    searchText: string,
    statusFilter: TicketStatus[],
    priorityFilter: TicketPriority[],
  ) => void;
  isFiltering: boolean;
  lastRefreshSecondsAgo: number | null;
  refresh: () => void;
  denseMode: boolean;
  setDenseMode: Dispatch<SetStateAction<boolean>>;
  showResolvedTickets: boolean;
  setShowResolvedTickets: Dispatch<SetStateAction<boolean>>;
  refreshTimeInterval: number;
  setRefreshTimeInterval: Dispatch<SetStateAction<number>>;
  isRefreshing: boolean;
} | null>(null);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [allTickets, setAllTickets] = useState<Ticket[]>(initialTickets);
  const [statusFilter, setStatusFilter] = useState<TicketStatus[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isApplyFilter, setIsApplyFilter] = useState<boolean>(false);
  const [, startTransition] = useTransition();
  const [isFiltering, setIsFiltering] = useState(false);
  const [lastRefreshAt, setLastRefreshAt] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [settings, setSettings] = useState<SettingOptions>(getInitialSettings);
  const { denseMode, showResolvedTickets, refreshTimeInterval } = settings;

  useEffect(() => {
    const id = setInterval(() => {
      refresh();
    }, refreshTimeInterval * 1000);

    return () => {
      clearInterval(id);
    };
  }, [refreshTimeInterval]);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

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

  const showAllStatus = statusFilter.length === 0;
  const showAllPriority = priorityFilter.length === 0;
  const lastRefreshSecondsAgo = useMemo(() => {
    if (lastRefreshAt === null) {
      return null;
    }

    return Math.max(0, Math.floor((currentTime - lastRefreshAt) / 1000));
  }, [currentTime, lastRefreshAt]);

  const filteredTickets = useMemo(() => {
    const normalizedSearchText = searchText.toLowerCase();

    return allTickets.filter((ticket) => {
      const matchesSetting = showResolvedTickets
        ? true
        : ticket.status !== "resolved";

      const matchesStatus =
        showAllStatus || statusFilter.includes(ticket.status);

      const matchesPriority =
        showAllPriority || priorityFilter.includes(ticket.priority);

      const matchesSearch =
        normalizedSearchText === "" ||
        ticket.customerName.toLowerCase().includes(normalizedSearchText) ||
        ticket.subject.toLowerCase().includes(normalizedSearchText) ||
        ticket.lastMessage.toLowerCase().includes(normalizedSearchText) ||
        ticket.notes.some((note) =>
          note.toLowerCase().includes(normalizedSearchText),
        );

      return (
        matchesSetting && matchesStatus && matchesPriority && matchesSearch
      );
    });
  }, [
    allTickets,
    priorityFilter,
    searchText,
    showResolvedTickets,
    showAllPriority,
    showAllStatus,
    statusFilter,
  ]);

  function handleClearFilter() {
    setStatusFilter([]);
    setPriorityFilter([]);
    setSearchText("");
    setIsApplyFilter(false);
  }

  function applyFilter(
    nextSearchText: string,
    nextStatusFilter: TicketStatus[],
    nextPriorityFilter: TicketPriority[],
  ) {
    setIsFiltering(true);

    setTimeout(() => {
      startTransition(() => {
        setStatusFilter(nextStatusFilter);
        setPriorityFilter(nextPriorityFilter);
        setSearchText(nextSearchText);
        setIsApplyFilter(true);
        setIsFiltering(false);
      });
    }, 1000);
  }

  function refresh() {
    setIsRefreshing(true);

    setTimeout(() => {
      setLastRefreshAt(Date.now());
      setIsRefreshing(false);
    }, 1000);
  }

  return (
    <TicketContext.Provider
      value={{
        allTickets,
        setAllTickets,
        filteredTickets,
        searchText,
        statusFilter,
        priorityFilter,
        isApplyFilter,
        handleClearFilter,
        applyFilter,
        isFiltering,
        lastRefreshSecondsAgo,
        refresh,
        denseMode,
        setDenseMode,
        showResolvedTickets,
        setShowResolvedTickets,
        refreshTimeInterval,
        setRefreshTimeInterval,
        isRefreshing,
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
