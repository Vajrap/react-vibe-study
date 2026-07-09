"use client";

import {
  createContext,
  createElement,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type TicketStatus = "open" | "pending" | "resolved";
export type TicketPriority = "low" | "medium" | "high";

export type Ticket = {
  id: number;
  customerName: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  lastMessage: string;
  assignee: string;
  notes: string[];
};

export type TicketFilters = {
    searchText: string;
    statusFilter: TicketStatus | "all";
    priorityFilter: TicketPriority | "all";
};

export const initialTickets: Ticket[] = [
  {
    id: 1,
    customerName: "Anya Patel",
    subject: "Cannot reset password",
    status: "open",
    priority: "high",
    createdAt: "2026-07-07T09:15:00.000Z",
    lastMessage: "The reset email never arrives.",
    assignee: "Mina",
    notes: [],
  },
  {
    id: 2,
    customerName: "Leo Chen",
    subject: "Invoice address is wrong",
    status: "pending",
    priority: "medium",
    createdAt: "2026-07-07T10:30:00.000Z",
    lastMessage: "Please update the billing address before Friday.",
    assignee: "Nok",
    notes: ["Asked finance team to verify tax details."],
  },
  {
    id: 3,
    customerName: "Sara Williams",
    subject: "Feature request: export CSV",
    status: "resolved",
    priority: "low",
    createdAt: "2026-07-06T16:45:00.000Z",
    lastMessage: "CSV export would help our monthly report.",
    assignee: "Mina",
    notes: ["Marked as product feedback."],
  },
  {
    id: 4,
    customerName: "Cream Williams",
    subject: "Feature request: export PDF",
    status: "resolved",
    priority: "low",
    createdAt: "2026-07-06T16:45:00.000Z",
    lastMessage: "PDF export would help our readers.",
    assignee: "Patiphon",
    notes: [],
  },
];

export type TicketCountsByStatus = Record<TicketStatus, number>;

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

  // useMemo
  // const selectedTicket = useMemo(
  //   () => tickets.find((ticket) => ticket.id === selectedTicketId) ?? null,
  //   [selectedTicketId, tickets],
  // );

  // const ticketCountsByStatus = useMemo<TicketCountsByStatus>(() => {
  //   return tickets.reduce(
  //     (counts, ticket) => ({
  //       ...counts,
  //       [ticket.status]: counts[ticket.status] + 1,
  //     }),
  //     { open: 0, pending: 0, resolved: 0 },
  //   );
  // }, [tickets]);

  // const filteredTickets = useMemo(() => {
  //   const normalizedSearchText = searchText.trim().toLowerCase();

  //   const hasNoActiveFilters =
  //     !normalizedSearchText &&
  //     statusFilter === "all" &&
  //     priorityFilter === "all" &&
  //     showResolvedTickets;

  //   if (hasNoActiveFilters) {
  //     return tickets;
  //   }

  //   return tickets.filter((ticket) => {
  //     const matchesSearch =
  //       !normalizedSearchText ||
  //       ticket.subject.toLowerCase().includes(normalizedSearchText) ||
  //       ticket.customerName.toLowerCase().includes(normalizedSearchText);
  //     const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
  //     const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
  //     const matchesResolvedSetting = showResolvedTickets || ticket.status !== "resolved";

  //     return matchesSearch && matchesStatus && matchesPriority && matchesResolvedSetting;
  //   });
  // }, [priorityFilter, searchText, showResolvedTickets, statusFilter, tickets]);

  // const sortedTickets = useMemo(() => {
  //   const hasNoActiveFilters =
  //     !searchText.trim() &&
  //     statusFilter === "all" &&
  //     priorityFilter === "all" &&
  //     showResolvedTickets;

  //   if (hasNoActiveFilters) {
  //     return filteredTickets;
  //   }

  // return [...filteredTickets].sort(
  //   (firstTicket, secondTicket) =>
  //     new Date(secondTicket.createdAt).getTime() -
  //     new Date(firstTicket.createdAt).getTime(),
  // );
  // }, [filteredTickets, priorityFilter, searchText, showResolvedTickets, statusFilter]);

  // useEffect
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

  // useEffect(() => {
  //   if (!isRefreshing) {
  //     return;
  //   }

  //   const timeoutId = setTimeout(() => {
  //     setIsRefreshing(false);
  //     console.log("refresh finished");
  //   }, 1000);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [isRefreshing]);

  // useCallback
  // const handleClick = useCallback((event: React.MouseEvent<unknown>, id: number) => {
  //         setSelectedTicketId(id);
  //   }, [setSelectedTicketId]);

  // function changeTicketStatus(ticketId: number, status: TicketStatus) {
  //   setTickets((currentTickets) =>
  //     currentTickets.map((ticket) =>
  //       ticket.id === ticketId ? { ...ticket, status } : ticket,
  //     ),
  //   );
  // }

  // function addTicketNote(ticketId: number, note: string) {
  //   setTickets((currentTickets) =>
  //     currentTickets.map((ticket) =>
  //       ticket.id === ticketId
  //         ? { ...ticket, notes: [...ticket.notes, note] }
  //         : ticket,
  //     ),
  //   );
  // }

  // function clearFilters() {
  //   setSearchText("");
  //   setStatusFilter("all");
  //   setPriorityFilter("all");
  //   setShowResolvedTickets(true);
  // }

  // function refreshTickets() {
  //   setIsRefreshing(true);
  //   console.log("refresh started");

  //   setTickets(initialTickets);
  //   setSelectedTicketId(null);
  //   // setSearchText("");
  //   // setStatusFilter("all");
  //   // setPriorityFilter("all");
  //   setSettingsOpen(false);
  //   setDenseMode(false);
  //   // setShowResolvedTickets(true);
  //   setRefreshIntervalSeconds(5);
  // }

  function showResolved(isShow: boolean) {
    setShowResolvedTickets(isShow);
  }

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
