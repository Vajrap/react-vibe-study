"use client"

import Box from "@mui/material/Box"
import TicketList from "./TicketList"
import { useCallback, useEffect, useMemo, useState } from "react";
import TicketDetailPanel from "./TicketDetailPanel";
import { Ticket, TicketStatus, initialTickets } from "./types";
import { Alert, Snackbar } from "@mui/material";

export default function TicketContent() {
    const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [open, setOpen] = useState(false);

    const onSelectTicket = useCallback(
        (ticketId: number) => {
            setSelectedTicketId(ticketId);
        }, []);

    const selectedTicket = useMemo(
        () => tickets.find((ticket) => ticket.id === selectedTicketId) ?? null,
        [selectedTicketId, tickets],
    );

    const onChangeStatus = useCallback((ticketId: number, status: TicketStatus) => {
        setTickets((currentTickets) =>
            currentTickets.map((ticket) =>
                ticket.id === ticketId ? { ...ticket, status } : ticket,
            ),
        );
        setOpen(true)
        setSnackbarMessage("Ticket status updated");
    }, []);

    const onAddNote = useCallback((ticketId: number, note: string) => {
        setTickets((currentTickets) =>
            currentTickets.map((ticket) =>
                ticket.id === ticketId
                    ? { ...ticket, notes: [...ticket.notes, note] }
                    : ticket,
            ),
        );
        setOpen(true)
        setSnackbarMessage("Internal note added");
    }, []);

    const handleCloseSnackbar = useCallback(
        () => {
            setOpen(false)
        }, []
    )

    useEffect(() => {
        if (selectedTicket) {
            document.title = `${selectedTicket.subject} | HelpDesk Console`;
            return;
        }

        document.title = "HelpDesk Console";
    }, [selectedTicket]);

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 420px" },
                gap: 3,
            }}
        >
            <TicketList tickets={tickets} onSelectTicket={onSelectTicket} />
            <TicketDetailPanel selectedTicket={selectedTicket} onChangeStatus={onChangeStatus} onAddNote={onAddNote} />
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert severity="success" variant="filled" onClose={handleCloseSnackbar} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}