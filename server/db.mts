import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

import type {
  CreateTicketInput,
  Ticket,
  TicketPriority,
  TicketStatus,
  UpdateTicketInput,
} from "../shared/ticket.ts";

type TicketRow = {
  id: number;
  customer_name: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  created_at: string;
  last_message: string;
  assignee: string;
  notes: string;
};

const dataDirectory = join(dirname(fileURLToPath(import.meta.url)), "data");
mkdirSync(dataDirectory, { recursive: true });

const database = new DatabaseSync(join(dataDirectory, "lesson.db"));

const seedTickets: CreateTicketInput[] = [
  {
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

database.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    subject TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('open', 'pending', 'resolved')),
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
    created_at TEXT NOT NULL,
    last_message TEXT NOT NULL,
    assignee TEXT NOT NULL,
    notes TEXT NOT NULL DEFAULT '[]'
  ) STRICT;
`);

const selectTicketColumns = `
  SELECT id, customer_name, subject, status, priority, created_at,
         last_message, assignee, notes
  FROM tickets
`;

const insertTicketStatement = database.prepare(`
  INSERT INTO tickets (
    customer_name, subject, status, priority, created_at,
    last_message, assignee, notes
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

function toTicket(row: TicketRow): Ticket {
  return {
    id: row.id,
    customerName: row.customer_name,
    subject: row.subject,
    status: row.status,
    priority: row.priority,
    createdAt: row.created_at,
    lastMessage: row.last_message,
    assignee: row.assignee,
    notes: JSON.parse(row.notes) as string[],
  };
}

function insertTicket(input: CreateTicketInput): Ticket {
  const result = insertTicketStatement.run(
    input.customerName,
    input.subject,
    input.status,
    input.priority,
    input.createdAt ?? new Date().toISOString(),
    input.lastMessage,
    input.assignee,
    JSON.stringify(input.notes),
  );

  return getTicket(Number(result.lastInsertRowid))!;
}

export function seedDatabase(): void {
  const row = database.prepare("SELECT COUNT(*) AS count FROM tickets").get() as {
    count: number;
  };

  if (row.count === 0) {
    database.exec("BEGIN");
    try {
      seedTickets.forEach(insertTicket);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
}

export function resetDatabase(): Ticket[] {
  database.exec("BEGIN");
  try {
    database.exec("DELETE FROM tickets; DELETE FROM sqlite_sequence WHERE name = 'tickets';");
    seedTickets.forEach(insertTicket);
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }

  return listTickets();
}

export function listTickets(): Ticket[] {
  return (database.prepare(`${selectTicketColumns} ORDER BY created_at DESC`).all() as TicketRow[]).map(
    toTicket,
  );
}

export function getTicket(id: number): Ticket | undefined {
  const row = database.prepare(`${selectTicketColumns} WHERE id = ?`).get(id) as
    | TicketRow
    | undefined;
  return row ? toTicket(row) : undefined;
}

export function createTicket(input: CreateTicketInput): Ticket {
  return insertTicket(input);
}

export function updateTicket(id: number, input: UpdateTicketInput): Ticket | undefined {
  const current = getTicket(id);
  if (!current) {
    return undefined;
  }

  const updated = { ...current, ...input };
  database
    .prepare(`
      UPDATE tickets
      SET customer_name = ?, subject = ?, status = ?, priority = ?,
          last_message = ?, assignee = ?, notes = ?
      WHERE id = ?
    `)
    .run(
      updated.customerName,
      updated.subject,
      updated.status,
      updated.priority,
      updated.lastMessage,
      updated.assignee,
      JSON.stringify(updated.notes),
      id,
    );

  return getTicket(id);
}

export function deleteTicket(id: number): boolean {
  const result = database.prepare("DELETE FROM tickets WHERE id = ?").run(id);
  return Number(result.changes) > 0;
}

export function closeDatabase(): void {
  database.close();
}

seedDatabase();
