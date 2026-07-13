import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Ticket, TicketPriority, TicketStatus } from "../types";
import { useTicketContext } from "../context";
import {
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Input,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface Props {
  setSelectedTicket: (ticket: Ticket) => void;
}

export default function TicketListAndFilter({ setSelectedTicket }: Props) {
  const { allTickets, showResolvedTickets } = useTicketContext();
  const [searchInput, setSearchInput] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isSearchScheduled, setIsSearchScheduled] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showAllStatus = statusFilter.length === 0;
  const showAllPriority = priorityFilter.length === 0;

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  function handleSearchChange(value: string) {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setIsSearchScheduled(true);
    searchTimeoutRef.current = setTimeout(() => {
      startTransition(() => {
        setSearchInput(value);
        setIsSearchScheduled(false);
      });
      searchTimeoutRef.current = null;
    }, 1000);
  }

  const filteredTickets = useMemo(() => {
    const normalizedSearchInput = searchInput.toLowerCase();

    const filtered: Ticket[] = allTickets.filter((ticket) => {
      const matchesSetting = showResolvedTickets
        ? true
        : ticket.status !== "resolved";

      const matchesStatus =
        showAllStatus || statusFilter.includes(ticket.status);
      const matchesPriority =
        showAllPriority || priorityFilter.includes(ticket.priority);

      const matchesSearchInput =
        normalizedSearchInput === "" ||
        ticket.customerName
          .toLocaleLowerCase()
          .includes(normalizedSearchInput) ||
        ticket.subject.toLowerCase().includes(normalizedSearchInput) ||
        ticket.lastMessage.toLowerCase().includes(normalizedSearchInput) ||
        ticket.notes.some((note) =>
          note.toLowerCase().includes(normalizedSearchInput),
        );

      return (
        matchesSetting && matchesStatus && matchesPriority && matchesSearchInput
      );
    });

    return filtered;
  }, [
    allTickets,
    statusFilter,
    priorityFilter,
    searchInput,
    showAllPriority,
    showAllStatus,
    showResolvedTickets,
  ]);

  return (
    <Stack direction={"column"} spacing={2}>
      <FilterSection
        setSearchInput={handleSearchChange}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />
      {isPending && !isSearchScheduled ? (
        <Typography>Updating...</Typography>
      ) : null}
      <Tickets
        filteredTickets={filteredTickets}
        isFiltering={isSearchScheduled || isPending}
        setSelectedTicket={setSelectedTicket}
      />
    </Stack>
  );
}

type FilterUnit<T> = {
  filter: T;
};
type FilterGroup<T> = {
  type: "Status" | "Priority";
  name: string;
  units: FilterUnit<T>[];
};
const statuses: FilterGroup<TicketStatus> = {
  type: "Status",
  name: "Filter by Status",
  units: [{ filter: "open" }, { filter: "pending" }, { filter: "resolved" }],
};
const priorities: FilterGroup<TicketPriority> = {
  type: "Priority",
  name: "Filter by Priority",
  units: [{ filter: "high" }, { filter: "medium" }, { filter: "low" }],
};
const filterGroups = [statuses, priorities];

interface FilterProps {
  setSearchInput: (value: string) => void;
  statusFilter: TicketStatus[];
  priorityFilter: TicketPriority[];
  setStatusFilter: React.Dispatch<React.SetStateAction<TicketStatus[]>>;
  setPriorityFilter: React.Dispatch<React.SetStateAction<TicketPriority[]>>;
}

function FilterSection({
  setSearchInput,
  statusFilter,
  priorityFilter,
  setStatusFilter,
  setPriorityFilter,
}: FilterProps) {
  const [inputText, setInputText] = useState("");

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

  function clearFilters() {
    setStatusFilter([]);
    setPriorityFilter([]);
    setSearchInput("");
    setInputText("");
  }

  return (
    <Stack direction={"column"} sx={{ paddingX: 4 }} spacing={2}>
      <Stack direction={"row"} spacing={2}>
        <Input
          placeholder="Search tickets"
          value={inputText}
          onChange={(event) => {
            const nextInputText = event.target.value;
            setInputText(nextInputText);
            setSearchInput(nextInputText);
          }}
          sx={{ border: 1, width: "400px" }}
        />
        <Button variant="contained" color="secondary" onClick={clearFilters}>
          Reset filters
        </Button>
      </Stack>
      <Stack direction="column">
        {filterGroups.map((filterGroup) => (
          <Stack
            key={filterGroup.type}
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}
          >
            <Typography>{filterGroup.name}</Typography>
            <Stack direction="row" spacing={1}>
              {filterGroup.units.map((filterUnit) => {
                const value = filterUnit.filter;
                const checked =
                  filterGroup.type === "Status"
                    ? statusFilter.includes(value as TicketStatus)
                    : priorityFilter.includes(value as TicketPriority);
                return (
                  <FormControlLabel
                    key={value}
                    control={
                      <Checkbox
                        onClick={() => {
                          if (filterGroup.type === "Status") {
                            handleStatusChecked(value as TicketStatus);
                          } else {
                            handlePriorityChecked(value as TicketPriority);
                          }
                        }}
                        checked={checked}
                      />
                    }
                    label={value.toLowerCase()}
                  />
                );
              })}
            </Stack>
            <Divider />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

function statusChipColor(status: TicketStatus) {
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

interface TicketsProps {
  filteredTickets: Ticket[];
  isFiltering: boolean;
  setSelectedTicket: (ticket: Ticket) => void;
}
function Tickets(props: TicketsProps) {
  const { denseMode } = useTicketContext();

  if (props.isFiltering) {
    return (
      <Stack direction={"column"} sx={{ alignItems: "center", paddingTop: 20 }}>
        <Typography variant="h5">Loading</Typography>
        <Typography variant="h6">Please wait...</Typography>
      </Stack>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size={denseMode ? "small" : "medium"}>
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                fontWeight: "bold",
              },
            }}
          >
            <TableCell>Customer</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Assignee</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.filteredTickets.map((ticket) => (
            <TableRow
              key={ticket.id}
              hover
              onClick={() => props.setSelectedTicket(ticket)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{ticket.customerName}</TableCell>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell>
                <Chip
                  color={statusChipColor(ticket.status)}
                  label={ticket.status}
                ></Chip>
              </TableCell>
              <TableCell>
                <Chip
                  color={priorityChipColor(ticket.priority)}
                  label={ticket.priority}
                ></Chip>
              </TableCell>
              <TableCell>{ticket.assignee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
