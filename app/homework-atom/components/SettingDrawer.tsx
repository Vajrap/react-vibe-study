import {
  Divider,
  Drawer,
  FormControlLabel,
  Slider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useTicketContext } from "../context";

type SettingDrawerProps = {
  open: boolean;
  onClose: (value: boolean) => void;
};

export default function SettingDrawer(props: SettingDrawerProps) {
  const {
    denseMode,
    setDenseMode,
    showResolvedTickets,
    setShowResolvedTickets,
    refreshTimeInterval,
    setRefreshTimeInterval,
  } = useTicketContext();

  return (
    <Drawer anchor="right" open={props.open} onClose={props.onClose}>
      <Stack spacing={3} sx={{ width: 360, padding: 3 }}>
        <Stack spacing={1}>
          <Typography variant="h5">Settings</Typography>
          <Typography color="text.secondary">
            Display and refresh preferences
          </Typography>
        </Stack>

        <Divider />

        <Stack spacing={1}>
          <FormControlLabel
            control={
              <Switch
                checked={denseMode}
                onChange={(event) => setDenseMode(event.target.checked)}
              />
            }
            label="Dense list mode"
          />
          <FormControlLabel
            control={
              <Switch
                checked={showResolvedTickets}
                onChange={(event) =>
                  setShowResolvedTickets(event.target.checked)
                }
              />
            }
            label="Show resolved tickets"
          />
        </Stack>

        <Stack spacing={1}>
          <Typography>Refresh interval</Typography>
          <Typography color="text.secondary">
            {refreshTimeInterval} seconds
          </Typography>
          <Slider
            value={refreshTimeInterval}
            min={5}
            max={120}
            step={5}
            marks={[
              { value: 5, label: "5s" },
              { value: 60, label: "60s" },
              { value: 120, label: "120s" },
            ]}
            onChange={(_, value) => {
              if (typeof value === "number") {
                setRefreshTimeInterval(value);
              }
            }}
          />
        </Stack>
      </Stack>
    </Drawer>
  );
}
