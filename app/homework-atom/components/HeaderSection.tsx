import { Stack, Typography, Divider, Button } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import SettingDrawer from "./SettingDrawer";
import { ChevronLeft } from "@mui/icons-material";
import { useTicketContext } from "../context";
import { Ticket } from "../types";

const GET_TICKETS_API = "/api/tickets";

export function Header() {
  return (
    <Stack direction={"column"}>
      <Typography variant="h2" color="primary">
        Help Desk Console
      </Typography>
      <Divider />
    </Stack>
  );
}

export function HeaderActions() {
  const { setAllTickets } = useTicketContext();

  const [openSetting, setOpenSetting] = useState(false);
  const [lastRefreshAt, setLastRefreshAt] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { refreshTimeInterval } = useTicketContext();

  const refresh = useCallback(async () => {
    setIsRefreshing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(GET_TICKETS_API);
      const tickets: Ticket[] = await response.json();

      setAllTickets(tickets);
      setLastRefreshAt(Date.now());
    } finally {
      setIsRefreshing(false);
    }
  }, [setAllTickets]);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      refresh();
    }, refreshTimeInterval * 1000);

    return () => {
      clearInterval(id);
    };
  }, [refresh, refreshTimeInterval]);

  const lastRefreshSecondsAgo = useMemo(() => {
    if (lastRefreshAt === null) {
      return null;
    }

    return Math.max(0, Math.floor((currentTime - lastRefreshAt) / 1000));
  }, [currentTime, lastRefreshAt]);

  return (
    <>
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyItems: "center" }}
        spacing={1}
      >
        <Stack direction={"column"}>
          <Button onClick={refresh} variant="outlined" disabled={isRefreshing}>
            Refresh
          </Button>
          {lastRefreshSecondsAgo !== null && (
            <Typography>{`refreshed ${lastRefreshSecondsAgo} secs ago `}</Typography>
          )}
        </Stack>
        <Button
          onClick={() => {
            setOpenSetting(true);
          }}
          variant="outlined"
        >
          <ChevronLeft />
          {`Setting`}
        </Button>
      </Stack>
      <SettingDrawer open={openSetting} onClose={() => setOpenSetting(false)} />
    </>
  );
}
