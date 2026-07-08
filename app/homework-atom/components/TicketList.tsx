import {
  Chip,
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
import { useTicketContext } from "../context";
import { Ticket, TicketPriority, TicketStatus } from "../types";

export type TicketListProps = {
  setSelectedTicket: (ticket: Ticket) => void;
  onClose: () => void;
};

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

export default function TicketList(props: TicketListProps) {
  const { denseMode, filteredTickets, isFiltering } = useTicketContext();

  if (isFiltering) {
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
          {filteredTickets.map((ticket) => (
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
                  color={stausChipColor(ticket.status)}
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
