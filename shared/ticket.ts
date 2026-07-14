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

export type CreateTicketInput = Omit<Ticket, "id" | "createdAt"> & {
  createdAt?: string;
};

export type UpdateTicketInput = Partial<Omit<Ticket, "id" | "createdAt">>;
