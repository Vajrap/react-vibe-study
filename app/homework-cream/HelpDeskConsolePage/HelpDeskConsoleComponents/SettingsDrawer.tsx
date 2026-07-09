import { Drawer, Box, Stack, Typography, FormControlLabel, Switch, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, Button } from "@mui/material";
import { useHelpDeskSettings } from "../context";

export default function SettingsDrawer() {
    const {
        settingsOpen,
        denseMode,
        showResolvedTickets,
        refreshIntervalSeconds,
        closeSettings,
        setDenseMode,
        setShowResolvedTickets,
        setRefreshIntervalSeconds,
    } = useHelpDeskSettings();

    return (
        <Drawer anchor="right" open={settingsOpen} onClose={closeSettings}>
            <Box sx={{ width: 320, p: 3 }}>
                <Stack spacing={2}>
                    <Typography variant="h6">Settings</Typography>

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
                                onChange={(event) => setShowResolvedTickets(event.target.checked)}
                            />
                        }
                        label="Show resolved tickets"
                    />

                    <FormControl fullWidth>
                        <InputLabel>Refresh interval</InputLabel>
                        <Select
                            label="Refresh interval"
                            value={String(refreshIntervalSeconds)}
                            onChange={(event: SelectChangeEvent) =>
                                setRefreshIntervalSeconds(Number(event.target.value))
                            }
                        >
                            <MenuItem value="3">3 seconds</MenuItem>
                            <MenuItem value="5">5 seconds</MenuItem>
                            <MenuItem value="10">10 seconds</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="outlined" onClick={closeSettings}>
                        Close
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    );
}
