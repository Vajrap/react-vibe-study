"use client";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Dispatch, RefObject } from "react";
import { TicketFilters } from "../context";

interface FilterBarProps {
  inputRef: RefObject<HTMLInputElement | null>;
  onClearFilters: () => void;
  filters: TicketFilters;
  setFilters: Dispatch<TicketFilters>
}

export default function FilterBar({
  inputRef,
  onClearFilters,
  filters,
  setFilters
}: FilterBarProps) {

  function handleFilters(newFilters: TicketFilters) {
    setFilters(newFilters);
  }

  return (
    <Paper>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ alignItems: { xs: "stretch", md: "center" }, p: 2 }}
      >
        <TextField
          label="Search tickets"
          placeholder="Search by subject or customer"
          value={filters.searchText}
          inputRef={inputRef}
          onChange={(e) => handleFilters({ ...filters, searchText: e.target.value })}
          fullWidth
        />

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={filters.statusFilter}
            onChange={(e) => handleFilters({ ...filters, statusFilter: e.target.value })}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            label="Priority"
            value={filters.priorityFilter}
            onChange={(e) => handleFilters({ ...filters, priorityFilter: e.target.value })}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

        <Button type="button" variant="outlined" onClick={onClearFilters}>
          Clear filters
        </Button>
      </Stack>
    </Paper>
  );
}