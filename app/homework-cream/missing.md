# Missing Requirements

Checked against `HOMEWORK.md`.

## Not Met Yet

- Save settings to `localStorage`. 
- Load settings from `localStorage` when the page mounts.
- // Update `document.title` when the selected ticket changes.
- Show a snackbar after status changes or note additions.
- Add a parent `Show / Hide console` wrapper for testing interval cleanup.
- Move `useTransition` so it wraps search or filter state updates instead of running inside `useMemo`.
- Make the `useTransition` pending state visibly represent the slow list update.
- // Add `useCallback` for status-change and add-note handlers that are passed into child components.
- // Make the refresh label behave like `Last refreshed X seconds ago`; it currently repeats the configured interval value.
- Keep refresh loading temporary without replacing the whole console with a full-page loading screen.

## Mostly Present

- MUI components are used for the main UI.
- Tickets can be searched and filtered by status and priority.
- Filters can be cleared.
- Tickets can be selected.
- The detail panel shows the selected ticket.
- Ticket status can be changed.
- Internal notes can be added, the input clears, and the note field is focused again.
- Settings drawer exists.
- Dense mode, show resolved tickets, and refresh interval controls are implemented.
- Context is used from multiple child components.
- `useMemo` is used for filtered tickets, ticket counts, selected ticket, and sorted ticket list.
