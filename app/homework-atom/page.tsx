"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Ticket } from "./types";
import { Header, HeaderActions } from "./components/HeaderSection";
import { TicketProvider } from "./context";
import TicketDetailPanel, { OpenType } from "./components/TicketDetailPanel";
import TicketListAndFilter from "./components/TicketListAndFilter";

const DOCUMENT_DEFAULT_TITLE = "Homework";

export default function HelpDeskConsolePage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isAddNewTicket, setIsAddNewTicket] = useState(true);
  const [isDetailDirty, setIsDetailDirty] = useState(false);
  const [pendingTicket, setPendingTicket] = useState<OpenType | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    if (isAddNewTicket) {
      document.title = "New Ticket";
    } else if (selectedTicket) {
      document.title = selectedTicket.subject;
    } else {
      document.title = DOCUMENT_DEFAULT_TITLE;
    }
  }, [isAddNewTicket, selectedTicket]);

  const openTicket = useCallback((ticket: OpenType) => {
    if (ticket.type === "new") {
      setSelectedTicket(null);
      setIsAddNewTicket(true);
    } else {
      setSelectedTicket(ticket.ticket);
      setIsAddNewTicket(false);
    }

    setIsDetailDirty(false);
  }, []);

  function handleOpenTicket(ticket: OpenType) {
    if (isDetailDirty) {
      setPendingTicket(ticket);
      setIsConfirmOpen(true);
      return;
    }

    openTicket(ticket);
  }

  function handleConfirmDiscard() {
    if (pendingTicket) {
      openTicket(pendingTicket);
    }

    setPendingTicket(null);
    setIsConfirmOpen(false);
  }

  function handleCancelDiscard() {
    setPendingTicket(null);
    setIsConfirmOpen(false);
  }

  const openPanel: OpenType | null = isAddNewTicket
    ? { type: "new" }
    : selectedTicket
      ? { type: "exist", ticket: selectedTicket }
      : null;

  return (
    <TicketProvider>
      <Paper square sx={{ minHeight: "100vh", width: "100%" }}>
        <Header />
        <Stack direction={"row"}>
          <Stack
            direction={"column"}
            sx={{ minHeight: "100vh", width: "100%" }}
            spacing={2}
          >
            <Divider />
            <TicketListAndFilter
              setSelectedTicket={(ticket) =>
                handleOpenTicket({ type: "exist", ticket })
              }
            />
          </Stack>
          {/*Panel*/}
          <Stack sx={{ alignItems: "flex-end", padding: 2 }} spacing={2}>
            <Stack
              direction={"row"}
              spacing={1}
              sx={{ alignItems: "center", justifyContent: "flex-end" }}
            >
              <HeaderActions />
              <Button
                disabled={isAddNewTicket}
                onClick={() => handleOpenTicket({ type: "new" })}
                variant="contained"
              >
                Add New Ticket
              </Button>
            </Stack>
            {openPanel && (
              <TicketDetailPanel
                key={openPanel.type === "new" ? "new" : openPanel.ticket.id}
                ticket={openPanel}
                onDirtyChange={setIsDetailDirty}
              />
            )}
          </Stack>
        </Stack>
        <Dialog open={isConfirmOpen}>
          <DialogTitle>Are you sure want to discard this change?</DialogTitle>
          <DialogContentText sx={{ paddingX: 3 }}>
            You are about to discard the changes you made in this ticket. The
            data will be lost. Are you sure?
          </DialogContentText>
          <DialogActions>
            <Stack direction={"row"}>
              <Button onClick={handleCancelDiscard}>Cancel</Button>
              <Button onClick={handleConfirmDiscard}>Confirm</Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </Paper>
    </TicketProvider>
  );
}
