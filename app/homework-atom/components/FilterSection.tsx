import {
  Stack,
  Input,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTicketContext } from "../context";
import { TicketPriority, TicketStatus } from "../types";
import { Close } from "@mui/icons-material";

export default function FilterSection() {
  const {
    searchText,
    statusFilter: appliedStatusFilter,
    priorityFilter: appliedPriorityFilter,
    isApplyFilter,
    handleClearFilter: clearFilter,
    applyFilter,
    isFiltering,
    showResolvedTickets,
  } = useTicketContext();

  const searchInput = useRef<HTMLInputElement | null>(null);
  const [statusFilter, setStatusFilter] = useState<TicketStatus[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority[]>([]);
  const [draftSearchText, setDraftSearchText] = useState(searchText);

  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  function handleClearFilter() {
    setStatusFilter([]);
    setPriorityFilter([]);
    setDraftSearchText("");

    if (searchInput.current) {
      searchInput.current.value = "";
    }

    clearFilter();
  }

  function handleApplyFilter() {
    applyFilter(searchInput.current?.value ?? "", statusFilter, priorityFilter);
  }

  function toggleFilter<T>(previous: T[], target: T) {
    return previous.includes(target)
      ? previous.filter((item) => item !== target)
      : [...previous, target];
  }

  function handleStatusChecked(target: TicketStatus) {
    setStatusFilter((previous) => toggleFilter(previous, target));
  }

  function handlePriorityChecked(target: TicketPriority) {
    setPriorityFilter((previous) => toggleFilter(previous, target));
  }

  function checkFilterDirty<T>(draft: T[], applied: T[]) {
    return (
      draft.length !== applied.length ||
      draft.some((item) => !applied.includes(item))
    );
  }

  const isFilterDirty =
    draftSearchText !== searchText ||
    checkFilterDirty(statusFilter, appliedStatusFilter) ||
    checkFilterDirty(priorityFilter, appliedPriorityFilter);

  const isApplyDisabled = !isFilterDirty || isFiltering;

  return (
    <Stack direction={"column"} sx={{ paddingX: 4 }}>
      <Stack direction={"column"} spacing={2} sx={{ paddingY: 2 }}>
        <Input
          placeholder="Search tickets "
          inputRef={searchInput}
          onChange={(event) => setDraftSearchText(event.target.value)}
          sx={{ border: 1, width: "400px" }}
        />
        <Stack direction={"row"} spacing={2}>
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
            disabled={isApplyDisabled}
          >
            Apply Filter
          </Button>
        </Stack>
        {isFiltering ? <Typography>Updating...</Typography> : null}
        <Stack direction={"column"} sx={{ alignItems: "flex-start" }}>
          <Typography>Filter by types</Typography>
          <Stack direction={"row"}>
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
                  disabled={!showResolvedTickets}
                  onClick={() => handleStatusChecked("resolved")}
                  checkedIcon={!showResolvedTickets ? <Close /> : undefined}
                  checked={
                    showResolvedTickets
                      ? statusFilter.includes("resolved")
                      : true
                  }
                />
              }
              label={"Resolved"}
            />
          </Stack>
        </Stack>
        <Stack direction={"column"} sx={{ alignItems: "flex-start" }}>
          <Typography>Filter by priorities</Typography>
          <Stack direction={"row"}>
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
      </Stack>
    </Stack>
  );
}
