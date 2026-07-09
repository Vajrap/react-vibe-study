"use client"

import Box from "@mui/material/Box"
import TicketList from "./TicketList"
import { useCallback, useMemo, useState } from "react";
import { initialTickets, Ticket } from "../context";
import TicketDetailPanel from "./TicketDetailPanel";

export default function TicketContent() {
    const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

    const handleSelectTicket = useCallback(
        (ticketId: number) => {
            setSelectedTicketId(ticketId);
        }, []);

    const selectedTicket = useMemo(
        () => tickets.find((ticket) => ticket.id === selectedTicketId) ?? null,
        [selectedTicketId, tickets],
    );

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 420px" },
                gap: 3,
            }}
        >
            <TicketList tickets={tickets} handleSelectTicket={handleSelectTicket} />
            <TicketDetailPanel selectedTicket={selectedTicket} setTickets={setTickets} />
        </Box>
    )
}