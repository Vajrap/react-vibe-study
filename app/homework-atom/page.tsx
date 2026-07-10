"use client";

import { Button, Divider, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Ticket } from "./types";
import { Header } from "./components/HeaderSection";
import { TicketProvider } from "./context";
import TicketDetailModal from "./components/TicketDetailModal";
import TicketListAndFilter from "./components/TicketListAndFilter";

const DOCUMENT_DEFAULT_TITLE = "Homework";

export default function HelpDeskConsolePage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isAddNewTicket, setIsAddNewTicket] = useState(false);

  useEffect(() => {
    if (selectedTicket) {
      document.title = selectedTicket.subject;
    } else {
      document.title = DOCUMENT_DEFAULT_TITLE;
    }
  }, [selectedTicket]);

  function handleAddNewTicket() {
    document.title = "New Ticket";
    setIsAddNewTicket(true);
  }

  function handleCloseAddNewTicket() {
    document.title = DOCUMENT_DEFAULT_TITLE;
    setIsAddNewTicket(false);
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
          <Button onClick={handleAddNewTicket}>Add New Ticket</Button>
          <Divider />
          <TicketListAndFilter setSelectedTicket={setSelectedTicket} />
          {/*Modals*/}
          {selectedTicket && (
            <TicketDetailModal
              ticket={{ ticket: selectedTicket, type: "exist" }}
              onClose={handleCloseSelectedTicket}
            />
          )}
          {isAddNewTicket && (
            <TicketDetailModal
              ticket={{ type: "new" }}
              onClose={handleCloseAddNewTicket}
            />
          )}
        </Stack>
      </Paper>
    </TicketProvider>
  );
}
