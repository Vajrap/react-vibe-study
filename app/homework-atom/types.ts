export type TicketStatus = "open" | "pending" | "resolved";
export type TicketPriority = "low" | "medium" | "high";

export type Ticket = {
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

export const initialTickets: Ticket[] = [
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
