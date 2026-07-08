import {
  Stack,
  Input,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useRef } from "react";
import { useTicketContext } from "../context";

export default function FilterSection() {
  const {
    statusFilter,
    priorityFilter,
    isApplyFilter,
    handleClearFilter: clearFilter,
    handleStatusChecked,
    handlePriorityChecked,
    applyFilter,
  } = useTicketContext();

  const searchInput = useRef<HTMLInputElement | null>(null);

  function handleClearFilter() {
    if (searchInput.current) {
      searchInput.current.value = "";
    }

    clearFilter();
  }

  function handleApplyFilter() {
    applyFilter(searchInput.current?.value ?? "");
  }

  return (
    <Stack direction={"column"} spacing={1}>
      <Stack direction={"row"} spacing={2}>
        <Input
          placeholder="Search tickets "
          inputRef={searchInput}
          sx={{ border: 1, width: "400px" }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClearFilter}
          disabled={!isApplyFilter}
        >
          Reset filters
        </Button>
        <Button
          onClick={handleApplyFilter}
          variant="contained"
          color="primary"
          sx={{ maxWidth: 200 }}
        >
          Apply Filter
        </Button>
      </Stack>
      <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={2}>
        <Typography>Filter by types</Typography>
        <FormControlLabel
          control={
            <Checkbox
              onClick={() => handleStatusChecked("open")}
              checked={statusFilter.includes("open")}
            />
          }
          label={"Open"}
        />
        <FormControlLabel
          control={
            <Checkbox
              onClick={() => handleStatusChecked("pending")}
              checked={statusFilter.includes("pending")}
            />
          }
          label={"Pending"}
        />
        <FormControlLabel
          control={
            <Checkbox
              onClick={() => handleStatusChecked("resolved")}
              checked={statusFilter.includes("resolved")}
            />
          }
          label={"Resolved"}
        />
      </Stack>
      <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={2}>
        <Typography>Filter by priorities</Typography>
        <FormControlLabel
          control={
            <Checkbox
              onClick={() => handlePriorityChecked("high")}
              checked={priorityFilter.includes("high")}
            />
          }
          label={"High"}
        />
        <FormControlLabel
          control={
            <Checkbox
              onClick={() => handlePriorityChecked("medium")}
              checked={priorityFilter.includes("medium")}
            />
          }
          label={"Medium"}
        />
        <FormControlLabel
          control={
            <Checkbox
              onClick={() => handlePriorityChecked("low")}
              checked={priorityFilter.includes("low")}
            />
          }
          label={"Low"}
        />
      </Stack>
    </Stack>
  );
}
