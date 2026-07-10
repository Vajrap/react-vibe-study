# Missing Requirements

Checked against `HOMEWORK.md`.

## Not Met Yet

- Add `useCallback` for event handlers passed into child components.
- Show a snackbar after status changes or note additions.
- Add a parent `Show / Hide console` wrapper for testing interval cleanup.
- Focus the search input when the page first mounts.
- Make the selected ticket UI match the required detail panel shape instead of only a modal form.
- Show the selected ticket `createdAt` value in the detail UI.
- Show existing notes as existing notes, not only as one editable form field.
- Add a separate internal-note flow that appends a note, clears the note input, and focuses it again.
- Add the remaining `useMemo` derived values:
  - ticket counts by status
  - selected ticket
  - sorted ticket list
- Apply `useTransition` to filter changes as well as search changes.
- Make the `useTransition` pending state visibly represent the slow list update.
- Rename or add the requested settings context API:
  - `HelpDeskSettingsContext`
  - `HelpDeskSettingsProvider`
  - `useHelpDeskSettings`

## Mostly Present

- MUI components are used for the main UI.
- Tickets can be searched and filtered.
- Tickets can be selected.
- Ticket status can be changed through the save flow.
- Settings drawer exists.
- Dense mode, show resolved tickets, and refresh interval are implemented.
- Settings load from and save to `localStorage`.
- Refresh has a temporary loading state.
- The interval is cleaned up when the provider unmounts or the refresh interval changes.
