"use client"

import Box from "@mui/material/Box"
import TicketList from "./TicketList"
import { useCallback, useEffect, useMemo, useState } from "react";
import TicketDetailPanel from "./TicketDetailPanel";
import { Ticket, TicketStatus, initialTickets } from "./types";

export default function TicketContent() {
    const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

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
    }, []);

    const onAddNote = useCallback((ticketId: number, note: string) => {
        setTickets((currentTickets) =>
            currentTickets.map((ticket) =>
                ticket.id === ticketId
                    ? { ...ticket, notes: [...ticket.notes, note] }
                    : ticket,
            ),
        );
    }, []);

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
        </Box>
    )
}