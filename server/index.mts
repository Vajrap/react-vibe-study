import express, {
  type ErrorRequestHandler,
  type Request,
  type Response,
} from "express";

import type {
  CreateTicketInput,
  TicketPriority,
  TicketStatus,
  UpdateTicketInput,
} from "../shared/ticket.ts";
import {
  closeDatabase,
  createTicket,
  deleteTicket,
  getTicket,
  listTickets,
  resetDatabase,
  updateTicket,
} from "./db.mts";

const app = express();
const port = 4000;
const apiDelayMs = 1_000;
const statuses = new Set<TicketStatus>(["open", "pending", "resolved"]);
const priorities = new Set<TicketPriority>(["low", "medium", "high"]);

app.use("/api", (_request, _response, next) => {
  setTimeout(next, apiDelayMs);
});

app.use(express.json());

function parseId(request: Request, response: Response): number | undefined {
  const id = Number(request.params.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    response.status(400).json({ message: "Ticket id must be a positive integer." });
    return undefined;
  }
  return id;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function validateCreateTicket(value: unknown): CreateTicketInput | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const input = value as Record<string, unknown>;
  if (
    typeof input.customerName !== "string" ||
    typeof input.subject !== "string" ||
    typeof input.status !== "string" ||
    !statuses.has(input.status as TicketStatus) ||
    typeof input.priority !== "string" ||
    !priorities.has(input.priority as TicketPriority) ||
    typeof input.lastMessage !== "string" ||
    typeof input.assignee !== "string" ||
    !isStringArray(input.notes) ||
    (input.createdAt !== undefined && typeof input.createdAt !== "string")
  ) {
    return undefined;
  }

  return input as CreateTicketInput;
}

function validateUpdateTicket(value: unknown): UpdateTicketInput | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const input = value as Record<string, unknown>;
  const allowedKeys = new Set([
    "customerName",
    "subject",
    "status",
    "priority",
    "lastMessage",
    "assignee",
    "notes",
  ]);

  if (Object.keys(input).some((key) => !allowedKeys.has(key))) {
    return undefined;
  }
  if (Object.keys(input).length === 0) {
    return undefined;
  }
  if (input.status !== undefined && !statuses.has(input.status as TicketStatus)) {
    return undefined;
  }
  if (input.priority !== undefined && !priorities.has(input.priority as TicketPriority)) {
    return undefined;
  }
  if (input.notes !== undefined && !isStringArray(input.notes)) {
    return undefined;
  }
  for (const key of ["customerName", "subject", "lastMessage", "assignee"] as const) {
    if (input[key] !== undefined && typeof input[key] !== "string") {
      return undefined;
    }
  }

  return input as UpdateTicketInput;
}

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/tickets", (_request, response) => {
  response.json(listTickets());
});

app.get("/api/tickets/:id", (request, response) => {
  const id = parseId(request, response);
  if (id === undefined) return;

  const ticket = getTicket(id);
  if (!ticket) {
    response.status(404).json({ message: "Ticket not found." });
    return;
  }
  response.json(ticket);
});

app.post("/api/tickets", (request, response) => {
  const input = validateCreateTicket(request.body);
  if (!input) {
    response.status(400).json({ message: "Invalid ticket payload." });
    return;
  }
  response.status(201).json(createTicket(input));
});

app.patch("/api/tickets/:id", (request, response) => {
  const id = parseId(request, response);
  if (id === undefined) return;

  const input = validateUpdateTicket(request.body);
  if (!input) {
    response.status(400).json({ message: "Invalid ticket update." });
    return;
  }

  const ticket = updateTicket(id, input);
  if (!ticket) {
    response.status(404).json({ message: "Ticket not found." });
    return;
  }
  response.json(ticket);
});

app.delete("/api/tickets/:id", (request, response) => {
  const id = parseId(request, response);
  if (id === undefined) return;

  if (!deleteTicket(id)) {
    response.status(404).json({ message: "Ticket not found." });
    return;
  }
  response.status(204).end();
});

if (process.env.NODE_ENV !== "production") {
  app.post("/api/dev/reset", (_request, response) => {
    response.json(resetDatabase());
  });
}

app.use((_request, response) => {
  response.status(404).json({ message: "Route not found." });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  void _next;
  console.error(error);
  const status =
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
      ? error.status
      : 500;
  response
    .status(status)
    .json({ message: status === 500 ? "Internal server error." : "Invalid request." });
};
app.use(errorHandler);

const server = app.listen(port, "127.0.0.1", () => {
  console.log(`Lesson API running on http://127.0.0.1:${port}`);
});

function shutdown(): void {
  server.close(() => {
    closeDatabase();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
