import { Stack, Typography, Divider, Button } from "@mui/material";
import { useState } from "react";
import SettingDrawer from "./SettingDrawer";
import { useTicketContext } from "../context";
import { ChevronLeft } from "@mui/icons-material";

export function Header() {
  const [openSetting, setOpenSetting] = useState(false);
  const { isRefreshing, lastRefreshTime, refresh } = useTicketContext();

  return (
    <Stack direction={"column"}>
      <Typography variant="h2" color="primary">
        Help Desk Console
      </Typography>
      <Divider />
      <Stack
        direction={"row"}
        spacing={"auto"}
        sx={{ paddingY: 1, paddingX: 2 }}
      >
        <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={1}>
          <Button onClick={refresh} variant="outlined" disabled={isRefreshing}>
            Refresh
          </Button>
          {lastRefreshTime && (
            <Typography>{`Last Refreshed Time: ${lastRefreshTime}`}</Typography>
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
    </Stack>
  );
}
