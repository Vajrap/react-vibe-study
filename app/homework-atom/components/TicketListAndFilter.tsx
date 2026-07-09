import { useEffect, useRef, useState } from "react";
import { Ticket, TicketPriority, TicketStatus } from "../types";
import { useTicketContext } from "../context";

interface Props {
  setSelectedTicket: (ticket: Ticket) => void;
}

function stausChipColor(status: TicketStatus) {
  switch (status) {
    case "open":
      return "info";
    case "pending":
      return "warning";
    case "resolved":
      return "success";
  }
}

function priorityChipColor(priority: TicketPriority) {
  switch (priority) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "info";
  }
}

export default function TicketListAndFilre(props: Props) {
  const { allTickets } = useTicketContext();
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority[]>([]);

  function handleClearFilter() {
    setStatusFilter([]);
    setPriorityFilter([]);
    setSearchInput("");
    setFilteredTickets(allTickets);
  }
}
