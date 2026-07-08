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
  lastRefreshTime: string | null;
  refresh: () => void;
  denseMode: boolean;
  setDenseMode: Dispatch<SetStateAction<boolean>>;
  showResolvedTickets: boolean;
  setShowResolvedTickets: Dispatch<SetStateAction<boolean>>;
  refreshTimeInterval: number;
  setRefreshTimeInterval: Dispatch<SetStateAction<number>>;
  isRefreshing: boolean;
} | null>(null);

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function TicketProvider({ children }: { children: ReactNode }) {
  const [allTickets, setAllTickets] = useState<Ticket[]>(initialTickets);
  const [statusFilter, setStatusFilter] = useState<TicketStatus[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isApplyFilter, setIsApplyFilter] = useState<boolean>(false);
  const [, startTransition] = useTransition();
  const [isFiltering, setIsFiltering] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [denseMode, setDenseMode] = useState(true);
  const [showResolvedTickets, setShowResolvedTickets] = useState(false);
  const [refreshTimeInterval, setRefreshTimeInterval] = useState(30);

  useEffect(() => {
    const id = setInterval(() => {
      refresh();
    }, refreshTimeInterval * 1000);

    return () => {
      clearInterval(id);
    };
  }, [refreshTimeInterval]);

  const showAllStatus = statusFilter.length === 0;
  const showAllPriority = priorityFilter.length === 0;

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
      setLastRefreshTime(formatTime(new Date()));
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
        lastRefreshTime,
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
