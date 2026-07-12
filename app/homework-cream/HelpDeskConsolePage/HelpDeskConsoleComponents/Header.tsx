"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useHelpDeskSettings } from "../context";

interface HeaderProps {
  refreshTickets: () => void, 
  isRefreshing: boolean
}

export default function Header({ refreshTickets, isRefreshing }: HeaderProps) {
  const { openSettings, lastRefreshLabel } = useHelpDeskSettings();

  return (
    <Box>
      <AppBar position="static" elevation={1}>
        <Toolbar
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            py: 1.5,
          }}
        >
          <IconButton
            size="large"
            aria-label="refresh tickets"
            onClick={refreshTickets}
            disabled={isRefreshing}
            color="inherit"
          >
            <RefreshIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, minWidth: 240 }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{ fontWeight: 700, lineHeight: 1.2 }}
            >
              Help Desk Console
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {lastRefreshLabel}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <IconButton
              size="large"
              aria-label="open settings"
              onClick={openSettings}
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
