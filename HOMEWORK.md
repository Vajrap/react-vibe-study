# Homework: Help Desk Console

Build one web app page called `HelpDeskConsolePage`.

Use **React + MUI**. The goal is to practice the React lifecycle and hooks we have learned in one realistic page. Do not use `useReducer` or `useImperativeHandle` for this homework.

Target time: 3-4 hours.

## App Idea

Create a help desk console for a small support team.

The user should be able to:

- View support tickets.
- Search and filter tickets.
- Select one ticket and see its detail panel.
- Change the ticket status.
- Add an internal note.
- See a live "last refreshed" timer.
- Open and close a settings panel.

This is one page, not a full product. Keep all data in the frontend.

## Use MUI for the UI instead of plain HTML controls.

## Starter Data

Create local ticket data in the page file or a nearby file.

```tsx
type TicketStatus = "open" | "pending" | "resolved";
type TicketPriority = "low" | "medium" | "high";

type Ticket = {
  id: number;
  customerName: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  lastMessage: string;
  assignee: string;
  notes: string[];
};

const initialTickets: Ticket[] = [
  {
    id: 1,
    customerName: "Anya Patel",
    subject: "Cannot reset password",
    status: "open",
    priority: "high",
    createdAt: "2026-07-07T09:15:00.000Z",
    lastMessage: "The reset email never arrives.",
    assignee: "Mina",
    notes: [],
  },
  {
    id: 2,
    customerName: "Leo Chen",
    subject: "Invoice address is wrong",
    status: "pending",
    priority: "medium",
    createdAt: "2026-07-07T10:30:00.000Z",
    lastMessage: "Please update the billing address before Friday.",
    assignee: "Nok",
    notes: ["Asked finance team to verify tax details."],
  },
  {
    id: 3,
    customerName: "Sara Williams",
    subject: "Feature request: export CSV",
    status: "resolved",
    priority: "low",
    createdAt: "2026-07-06T16:45:00.000Z",
    lastMessage: "CSV export would help our monthly report.",
    assignee: "Mina",
    notes: ["Marked as product feedback."],
  },
];
```

Add more tickets if you want the list to feel realistic.

## Required Layout

The page should have these areas:

1. Header

Show the page title, a refresh button, and a settings button.

2. Filter bar

Add:

- Search input.
- Status filter.
- Priority filter.
- Clear filters button.

3. Ticket list

Show the filtered tickets. Each ticket should show:

- Subject.
- Customer name.
- Status chip.
- Priority chip.
- Assignee.

Clicking a ticket selects it.

4. Ticket detail panel

When a ticket is selected, show:

- Subject.
- Customer name.
- Last message.
- Created date.
- Status selector.
- Existing notes.
- Text field for a new internal note.
- Add note button.

5. Settings drawer

Use a MUI `Drawer` for settings. It can include simple local settings:

- Dense list mode.
- Show resolved tickets.
- Refresh interval in seconds.

These settings only need to affect the frontend page.

## Hook Requirements

### `useState`

Use `useState` for local UI state:

- Search text.
- Selected status filter.
- Selected priority filter.
- Selected ticket id.
- Ticket data.
- New note text.
- Drawer open/closed.
- Snackbar open/closed.
- Loading state for refresh.

### `useEffect`

Use `useEffect` for side effects:

- Update `document.title` when the selected ticket changes.
- Simulate loading when the refresh button is clicked.
- Save simple settings to `localStorage`.
- Load simple settings from `localStorage` when the page mounts.

### Cleanup Function

Create an interval that updates a "last refreshed X seconds ago" label.

The interval must be cleaned up when the component unmounts or when the refresh interval setting changes.

### `useRef`

Use `useRef` for direct DOM access:

- Focus the search input when the page first mounts.
- Focus the note text field after selecting a ticket.
- Focus the note text field after adding a note.

Do not use `useRef` for state that should render on screen.

### `useMemo`

Use `useMemo` for derived values:

- Filtered tickets.
- Ticket counts by status.
- Selected ticket.
- Sorted ticket list.

### `useCallback`

Use `useCallback` for event handlers that are passed into child components.

Create at least two child components, for example:

- `TicketList`
- `TicketDetailPanel`
- `FilterBar`
- `SettingsDrawer`

Then pass memoized handlers such as:

- `onSelectTicket`
- `onChangeStatus`
- `onAddNote`
- `onClearFilters`

### `useContext`

Create one context for app-level display settings.

Example settings:

- `denseMode`
- `showResolvedTickets`
- `refreshIntervalSeconds`

Create:

- `HelpDeskSettingsContext`
- `HelpDeskSettingsProvider`
- `useHelpDeskSettings`

Use the context from at least two child components.

### `useTransition`

Use `useTransition` when applying search or filter changes.

The goal is to separate urgent input typing from slower list updates.

Show a small MUI loading indicator or "Updating..." label when `isPending` is true.

### React Lifecycle

Your implementation should make the lifecycle visible:

- On mount, focus the search input.
- On update, change the document title when the selected ticket changes.
- On update, recompute filtered tickets when filters change.
- On unmount, clean up the interval.

To prove cleanup works, wrap `HelpDeskConsolePage` in a parent component with a `Show / Hide console` button during testing.

## Required User Interactions

The finished page must support these flows:

1. Search tickets by subject or customer name.
2. Filter tickets by status.
3. Filter tickets by priority.
4. Clear all filters.
5. Select a ticket.
6. Change selected ticket status.
7. Add an internal note.
8. Open and close the settings drawer.
9. Toggle dense list mode.
10. Toggle whether resolved tickets are visible.
11. Change refresh interval.
12. Click refresh and show a temporary loading state.
13. Show a snackbar after status changes or note additions.
14. Hide and show the page during testing and confirm interval cleanup.

## Submission Checklist

Before calling the homework finished, confirm:

- The app uses MUI components for the main UI.
- Search and filters work together.
- Selecting a ticket updates the detail panel.
- Changing status updates the ticket list and detail panel.
- Adding a note clears the note input and focuses it again.
- `document.title` changes when a ticket is selected.
- The interval cleanup runs when the page is hidden or unmounted.
- Settings are read from and written to `localStorage`.
- `useMemo` is used for derived ticket data.
- `useCallback` is used for handlers passed to children.
- `useContext` is used by at least two components.
- `useTransition` shows a pending state during search or filter updates.

## Questions To Answer

Write short answers after finishing the page:

1. Which states cause the page to re-render?
2. Which values are derived with `useMemo`, and why are they not stored in state?
3. Which code runs on mount?
4. Which code runs on update?
5. Which code runs on unmount?
6. Why does the interval need a cleanup function?
7. Why is focusing an input a good `useRef` use case?
8. What problem does `useCallback` solve in this page?
9. What data belongs in context, and what data should stay local to the page?
10. What user interaction uses `useTransition`, and what does the pending state show?
