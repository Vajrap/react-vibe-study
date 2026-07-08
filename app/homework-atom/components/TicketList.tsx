import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTicketContext } from "../context";
import { Ticket } from "../types";

export type TicketListProps = {
  setSelectedTicket: (ticket: Ticket) => void;
  onClose: () => void;
};

export default function TicketList(props: TicketListProps) {
  const { filteredTickets } = useTicketContext();

  return (
    <TableContainer component={Paper}>
      <Table size="small">
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
              <TableCell>{ticket.status}</TableCell>
              <TableCell>{ticket.priority}</TableCell>
              <TableCell>{ticket.assignee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
