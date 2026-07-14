"use client";

import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import {
  HelpDeskSettingsProvider,
  useHelpDeskSettings
} from "./context";
import TicketContent from "./HelpDeskConsoleComponents/TicketContent";
import SettingsDrawer from "./HelpDeskConsoleComponents/SettingsDrawer";
import Header from "./HelpDeskConsoleComponents/Header";

export default function HelpDeskConsolePage() {
  // The state in context.ts will only be reset when HelpDeskSettingsProvider is unmounted and then remounted.
  return (
    <HelpDeskSettingsProvider>
      <HelpDeskConsoleContent />
    </HelpDeskSettingsProvider>
  );
}

function HelpDeskConsoleContent() {
  const { isRefreshing, setIsRefreshingState } = useHelpDeskSettings();

  return (
    <>
      <Header refreshTickets={() => setIsRefreshingState(true)} isRefreshing={isRefreshing} />
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
