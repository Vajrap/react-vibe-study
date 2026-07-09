"use client";

import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import {
  HelpDeskSettingsProvider,
  useHelpDeskSettings,
} from "./context";
import TicketContent from "./HelpDeskConsoleComponents/TicketContent";
import SettingsDrawer from "./HelpDeskConsoleComponents/SettingsDrawer";
import Header from "./HelpDeskConsoleComponents/Header";
import { useEffect, useMemo, useState } from "react";

export default function HelpDeskConsolePage() {
  return (
    <HelpDeskSettingsProvider>
      <HelpDeskConsoleContent />
    </HelpDeskSettingsProvider>
  );
}

function HelpDeskConsoleContent() {
  const { setRefreshIntervalSeconds } = useHelpDeskSettings();
  const [isRefreshing, setIsRefreshing] = useState(false);
  // const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  // const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [denseMode, setDenseMode] = useState(false);

  useEffect(() => {
    if (!isRefreshing) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setIsRefreshing(false);
      console.log("refresh finished");
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isRefreshing]);

  function refreshTickets() {
    setIsRefreshing(true);
    console.log("refresh started");

    // TOOD: Enable them
    // setTickets(initialTickets);
    // setSelectedTicketId(null);
    // setSearchText("");
    // setStatusFilter("all");
    // setPriorityFilter("all");
    // setSettingsOpen(false);
    // setDenseMode(false);
    // setShowResolvedTickets(true);
    // setRefreshIntervalSeconds(5);
  }

  return (
    <>
      <Header refreshTickets={refreshTickets} isRefreshing={isRefreshing} />
      {isRefreshing ? <Paper
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Refreshing...</Typography>
      </Paper> : <>
        <TicketContent />
        <SettingsDrawer />
      </>
      }
    </>
  );
}
