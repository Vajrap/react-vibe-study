import { Paper, Stack, Typography, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, Box, TextField, Button } from "@mui/material";
import { useState, useRef, useEffect, Dispatch, SetStateAction, useCallback } from "react";
import { Ticket, TicketStatus } from "./types";

interface TicketDetailPanelProps {
  selectedTicket: Ticket | null,
  setTickets: Dispatch<SetStateAction<Ticket[]>>
}

export default function TicketDetailPanel({ selectedTicket, setTickets }: TicketDetailPanelProps) {
  const [newNoteText, setNewNoteText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [selectedTicket?.id]);

  function onAddNote(ticketId: number, note: string) {
    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, notes: [...ticket.notes, note] }
          : ticket,
      ),
    );
  }

  function handleAddNote() {
    const note = newNoteText.trim();

    if (!note || !selectedTicket) {
      return;
    }

    onAddNote(selectedTicket.id, note);
    setNewNoteText("");
    inputRef.current?.focus();
  }

  function changeTicketStatus(ticketId: number, status: TicketStatus) {
    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status } : ticket,
      ),
    );
  }

  return (<>
    {selectedTicket ? <Paper sx={{ p: 3, m: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Ticket Details</Typography>
        <Typography variant="h5">{selectedTicket.subject}</Typography>
        <Typography>Customer: {selectedTicket.customerName}</Typography>
        <Typography>Last message: {selectedTicket.lastMessage}</Typography>
        <Typography>Created date: {new Date(selectedTicket.createdAt).toLocaleString()}</Typography>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={selectedTicket.status}
            onChange={(event: SelectChangeEvent) =>
              changeTicketStatus(selectedTicket.id, event.target.value as TicketStatus)
            }
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
          </Select>
        </FormControl>

        <Box>
          <Typography variant="subtitle1">Notes</Typography>
          {selectedTicket.notes.length === 0 ? (
            <Typography color="text.secondary">No notes yet.</Typography>
          ) : (
            selectedTicket.notes.map((note, index) => (
              <Typography key={`${note}-${index}`}>- {note}</Typography>
            ))
          )}
        </Box>

        <TextField
          label="New internal note"
          value={newNoteText}
          onChange={(event) => setNewNoteText(event.target.value)}
          multiline
          minRows={3}
          fullWidth
          inputRef={inputRef}
        />

        <Button variant="contained" onClick={handleAddNote}>
          Add note
        </Button>
      </Stack>
    </Paper>
      :
      <><Paper sx={{ p: 3, m: 3 }}>
        <Typography variant="h6">Ticket detail</Typography>
        <Typography color="text.secondary">Select a ticket to view detail.</Typography>
      </Paper>
      </>
    }
  </>
  );
}
