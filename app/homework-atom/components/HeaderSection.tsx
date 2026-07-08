import { Stack, Typography, Divider, Button } from "@mui/material";
import { useState } from "react";
import SettingDrawer from "./SettingDrawer";

export type HeaderProps = {
  refresh: () => void;
};

export function Header(props: HeaderProps) {
  const [openSetting, setOpenSetting] = useState(false);

  return (
    <Stack direction={"column"}>
      <Typography variant="h2" color="primary">
        Help Desk Console
      </Typography>
      <Divider />
      <Stack direction={"row"} spacing={2} sx={{ marginLeft: -1, paddingY: 2 }}>
        <Button
          onClick={() => {
            setOpenSetting(true);
            console.log(openSetting);
          }}
          variant="outlined"
        >
          {`Setting >>`}
        </Button>
        <Button onClick={props.refresh} variant="outlined">
          Refresh
        </Button>
      </Stack>
      <SettingDrawer open={openSetting} onClose={() => setOpenSetting(false)} />
    </Stack>
  );
}
