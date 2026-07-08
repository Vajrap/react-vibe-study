"use client";

import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Ticket } from "./types";
import FilterSection from "./components/FilterSection";
import { Header } from "./components/HeaderSection";
import { TicketProvider } from "./context";
import TicketDetailModal from "./components/TicketDetailModal";
import TicketList from "./components/TicketList";

export default function HomeWorkPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isAddNewTicket, setIsAddNewTicket] = useState(false);

  const [, setRefresher] = useState<number>(0);

  function refresh() {
    setRefresher((current) => current + 1);
  }

  function handleSelectTicket(ticket: Ticket) {
    setSelectedTicket(ticket);
  }

  function handleCloseSelectedTicket() {
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
          <Header refresh={refresh} />
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
