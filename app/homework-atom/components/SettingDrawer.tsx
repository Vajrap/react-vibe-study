import { Drawer } from "@mui/material";

type SettingDrawerProps = {
  open: boolean;
  onClose: (value: boolean) => void;
};

export default function SettingDrawer(props: SettingDrawerProps) {
  return (
    <Drawer anchor="left" open={props.open} onClose={props.onClose}></Drawer>
  );
}
