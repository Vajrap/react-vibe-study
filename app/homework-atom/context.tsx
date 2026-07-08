import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { initialTickets, Ticket, TicketPriority, TicketStatus } from "./types";

export const TicketContext = createContext<{
  allTickets: Ticket[];
  filteredTickets: Ticket[];
  setAllTickets: Dispatch<SetStateAction<Ticket[]>>;
  statusFilter: TicketStatus[];
  priorityFilter: TicketPriority[];
  isApplyFilter: boolean;
  handleClearFilter: () => void;
  handleStatusChecked: (target: TicketStatus) => void;
  handlePriorityChecked: (target: TicketPriority) => void;
  applyFilter: (searchText: string) => void;
} | null>(null);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [allTickets, setAllTickets] = useState<Ticket[]>(initialTickets);
  const [statusFilter, setStatusFilter] = useState<TicketStatus[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority[]>([]);
  const [appliedStatusFilter, setAppliedStatusFilter] = useState<
    TicketStatus[]
  >([]);
  const [appliedPriorityFilter, setAppliedPriorityFilter] = useState<
    TicketPriority[]
  >([]);
  const [searchText, setSearchText] = useState("");
  const [isApplyFilter, setIsApplyFilter] = useState<boolean>(false);

  const showAllStatus = appliedStatusFilter.length === 0;
  const showAllPriority = appliedPriorityFilter.length === 0;

  const filteredTickets = useMemo(() => {
    const normalizedSearchText = searchText.toLowerCase();

    return allTickets.filter((ticket) => {
      const matchesStatus =
        showAllStatus || appliedStatusFilter.includes(ticket.status);

      const matchesPriority =
        showAllPriority || appliedPriorityFilter.includes(ticket.priority);

      const matchesSearch =
        normalizedSearchText === "" ||
        ticket.customerName.toLowerCase().includes(normalizedSearchText) ||
        ticket.subject.toLowerCase().includes(normalizedSearchText) ||
        ticket.lastMessage.toLowerCase().includes(normalizedSearchText) ||
        ticket.notes.some((note) =>
          note.toLowerCase().includes(normalizedSearchText),
        );

      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [
    allTickets,
    appliedPriorityFilter,
    appliedStatusFilter,
    searchText,
    showAllPriority,
    showAllStatus,
  ]);

  function handleClearFilter() {
    setStatusFilter([]);
    setPriorityFilter([]);
    setAppliedStatusFilter([]);
    setAppliedPriorityFilter([]);
    setSearchText("");
    setIsApplyFilter(false);
  }

  function toggleFilter<T>(previous: T[], target: T) {
    return previous.includes(target)
      ? previous.filter((item) => item !== target)
      : [...previous, target];
  }

  function handleStatusChecked(target: TicketStatus) {
    setStatusFilter((previous) => toggleFilter(previous, target));
  }

  function handlePriorityChecked(target: TicketPriority) {
    setPriorityFilter((previous) => toggleFilter(previous, target));
  }

  function applyFilter(nextSearchText: string) {
    setAppliedStatusFilter(statusFilter);
    setAppliedPriorityFilter(priorityFilter);
    setSearchText(nextSearchText);
    setIsApplyFilter(true);
  }

  return (
    <TicketContext.Provider
      value={{
        allTickets,
        setAllTickets,
        filteredTickets,
        statusFilter,
        priorityFilter,
        isApplyFilter,
        handleClearFilter,
        handleStatusChecked,
        handlePriorityChecked,
        applyFilter,
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
