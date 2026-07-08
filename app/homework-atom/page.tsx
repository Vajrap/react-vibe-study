"use client";

import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Ticket } from "./types";
import FilterSection from "./components/FilterSection";
import { Header } from "./components/HeaderSection";
import { TicketProvider } from "./context";
import TicketDetailModal from "./components/TicketDetailModal";
import TicketList from "./components/TicketList";

const DOCUMENT_DEFAULT_TITLE = "Homework";

export default function HomeWorkPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isAddNewTicket, setIsAddNewTicket] = useState(false);

  function handleSelectTicket(ticket: Ticket) {
    document.title = ticket.subject;
    setSelectedTicket(ticket);
  }

  function handleCloseSelectedTicket() {
    document.title = DOCUMENT_DEFAULT_TITLE;
    setSelectedTicket(null);
  }

  return (
    <TicketProvider>
      <Paper square sx={{ minHeight: "100vh", width: "100%" }}>
        <Stack
          direction={"column"}
          sx={{ minHeight: "100vh", width: "100%" }}
          spacing={2}
        >
          <Header />
          <FilterSection />
          <Divider />
          <Stack direction={"row"} spacing={"auto"} sx={{ paddingX: 4 }}>
            <Typography variant="h5">All Tickets</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsAddNewTicket(true)}
            >
              Add New Ticket+
            </Button>
          </Stack>
          <TicketList
            setSelectedTicket={handleSelectTicket}
            onClose={handleCloseSelectedTicket}
          />
          {/*Modals*/}
          {selectedTicket && (
            <TicketDetailModal
              ticket={{ ticket: selectedTicket, type: "exist" }}
              onClose={() => setSelectedTicket(null)}
            />
          )}
          {isAddNewTicket && (
            <TicketDetailModal
              ticket={{ type: "new" }}
              onClose={() => setIsAddNewTicket(false)}
            />
          )}
        </Stack>
      </Paper>
    </TicketProvider>
  );
}
