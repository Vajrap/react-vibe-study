"use client"

import { Box, Stack, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useRef, useEffect, useTransition, useMemo, useState, useCallback } from "react";
import { useHelpDeskSettings } from "../context";
import FilterBar from "./FilterBar";
import { Ticket, TicketCountsByStatus, TicketFilters } from "./types";

interface TicketListProps {
    tickets: Ticket[],
    onSelectTicket: (ticketId: number) => void
}

export default function TicketList({ tickets, onSelectTicket }: TicketListProps) {
    const [filters, setFilters] = useState<TicketFilters>({
        searchText: "",
        statusFilter: "all",
        priorityFilter: "all",
    });

    const { denseMode, showResolvedTickets } = useHelpDeskSettings();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const ticketCountsByStatus = useMemo<TicketCountsByStatus>(() => {
        return tickets.reduce(
            (counts, ticket) => ({
                ...counts,
                [ticket.status]: counts[ticket.status] + 1,
            }),
            { open: 0, pending: 0, resolved: 0 },
        );
    }, [tickets]);

    const filteredTickets = useMemo(() => {
        const normalizedSearchText = filters.searchText.trim().toLowerCase();

        const hasNoActiveFilters =
            !normalizedSearchText &&
            filters.statusFilter === "all" &&
            filters.priorityFilter === "all" &&
            showResolvedTickets;

        if (hasNoActiveFilters) {
            return tickets;
        }

        let filteredTickets: Ticket[] = [];
        startTransition(() => {
            filteredTickets = tickets.filter((ticket) => {
                const matchesSearch =
                    !normalizedSearchText ||
                    ticket.subject.toLowerCase().includes(normalizedSearchText) ||
                    ticket.customerName.toLowerCase().includes(normalizedSearchText);
                const matchesStatus = filters.statusFilter === "all" || ticket.status === filters.statusFilter;
                const matchesPriority = filters.priorityFilter === "all" || ticket.priority === filters.priorityFilter;
                const matchesResolvedSetting = showResolvedTickets || ticket.status !== "resolved";

                return matchesSearch && matchesStatus && matchesPriority && matchesResolvedSetting;
            })
        });

        return [...filteredTickets].sort(
            (firstTicket, secondTicket) =>
                new Date(secondTicket.createdAt).getTime() -
                new Date(firstTicket.createdAt).getTime(),
        );
    }, [filters, showResolvedTickets, tickets]);

    const onClearFilters = useCallback(() => {
        setFilters({
            searchText: "",
            statusFilter: "all",
            priorityFilter: "all",
        })
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Typography variant="body2">Open: {ticketCountsByStatus.open}</Typography>
                <Typography variant="body2">Pending: {ticketCountsByStatus.pending}</Typography>
                <Typography variant="body2">Resolved: {ticketCountsByStatus.resolved}</Typography>
            </Stack>
            <FilterBar inputRef={inputRef} onClearFilters={onClearFilters} filters={filters} setFilters={setFilters} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size={denseMode ? "small" : "medium"} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Subject</TableCell>
                            <TableCell align="right">Customer name</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Priority</TableCell>
                            <TableCell align="right">Assignee</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isPending ? (
                            <p className="text-sm font-semibold text-teal-800">
                                Switching page...
                            </p>
                        ) : null}
                        {filteredTickets.map((ticket: Ticket) => (
                            <TableRow
                                onClick={() => onSelectTicket(ticket.id)}
                                hover
                                key={ticket.id}
                                sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {ticket.subject}
                                </TableCell>
                                <TableCell align="right">{ticket.customerName}</TableCell>
                                <TableCell align="right">{ticket.status}</TableCell>
                                <TableCell align="right">{ticket.priority}</TableCell>
                                <TableCell align="right">{ticket.assignee}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}