import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Stack,
  Typography,
} from "@mui/material";

import {
  FormContainer,
  TextFieldElement,
  ToggleButtonGroupElement,
  useForm,
} from "react-hook-form-mui";
import { useWatch } from "react-hook-form";

import { Ticket } from "../types";
import { useTicketContext } from "../context";
import { useEffect, useState } from "react";

export type OpenType = { type: "new" } | { type: "exist"; ticket: Ticket };

export type TicketDeatilModalProps = {
  ticket: OpenType;
  onDirtyChange: (isDirty: boolean) => void;
};

function formDefaultValues(): Ticket {
  return {
    id: 0,
    customerName: "",
    subject: "",
    status: "open",
    priority: "low",
    createdAt: new Date().toISOString(),
    lastMessage: "",
    assignee: "",
    notes: [],
  };
}

export default function TicketDetailPanel({
  ticket,
  onDirtyChange,
}: TicketDeatilModalProps) {
  const { allTickets, setAllTickets } = useTicketContext();
  const form = useForm<Ticket>({
    defaultValues:
      ticket.type === "exist" ? ticket.ticket : formDefaultValues(),
  });
  const isDirty = form.formState.isDirty;
  const notes = useWatch({ control: form.control, name: "notes" }) ?? [];

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  function handleSave() {
    const values = form.getValues();
    if (ticket.type === "new") {
      const nextId = Math.max(...allTickets.map((ticket) => ticket.id), 0) + 1;
      setAllTickets((previous) => [
        ...previous,
        {
          ...values,
          id: nextId,
        },
      ]);
    } else if (ticket.type === "exist") {
      setAllTickets((previous) =>
        previous.map((ticket) => (ticket.id === values.id ? values : ticket)),
      );
    }
  }

  function handleAddNote(note: string) {
    if (note.trim() === "") {
      return;
    }

    form.setValue("notes", [...notes, note], { shouldDirty: true });
  }

  function handleUpdateNote(index: number, note: string) {
    const nextNotes = [...notes];
    nextNotes[index] = note;
    form.setValue("notes", nextNotes, { shouldDirty: true });
  }

  return (
    <Box sx={{ margin: 2, border: 1, maxHeight: 900 }}>
      <FormContainer formContext={form} onSuccess={handleSave}>
        <DialogTitle>
          {ticket.type === "exist" ? "Update ticket" : "New ticket"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ minWidth: 480, paddingTop: 1 }}>
            <TextFieldElement name="customerName" label="Customer" required />
            <TextFieldElement name="subject" label="Subject" required />
            <TextFieldElement name="assignee" label="Assignee" />
            <TextFieldElement
              name="lastMessage"
              label="Last message"
              multiline
              minRows={3}
            />
            <Typography>Notes</Typography>
            <NotesSection
              notes={notes}
              onAddNote={handleAddNote}
              onUpdateNote={handleUpdateNote}
            />
            <ToggleButtonGroupElement
              name="status"
              label="Status"
              exclusive
              enforceAtLeastOneSelected
              options={[
                { id: "open", label: "Open" },
                { id: "pending", label: "Pending" },
                { id: "resolved", label: "Resolved" },
              ]}
            />
            <ToggleButtonGroupElement
              name="priority"
              label="Priority"
              exclusive
              enforceAtLeastOneSelected
              options={[
                { id: "low", label: "Low" },
                { id: "medium", label: "Medium" },
                { id: "high", label: "High" },
              ]}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!form.formState.isDirty}
            type="submit"
            variant="contained"
          >
            {ticket.type === "exist" ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </FormContainer>
    </Box>
  );
}

interface NoteSectionProps {
  notes: string[];
  onAddNote: (note: string) => void;
  onUpdateNote: (index: number, note: string) => void;
}

function NotesSection({ notes, onAddNote, onUpdateNote }: NoteSectionProps) {
  return (
    <Stack spacing={1}>
      <ExistingNotes notes={notes} onUpdateNote={onUpdateNote} />
      <NewNote onSave={onAddNote} />
    </Stack>
  );
}

interface ExistingNotesProps {
  notes: string[];
  onUpdateNote: (index: number, note: string) => void;
}

function ExistingNotes({ notes, onUpdateNote }: ExistingNotesProps) {
  return (
    <>
      {notes.map((note, index) => (
        <ExistingNote
          key={index}
          noteInput={note}
          onSave={(note) => onUpdateNote(index, note)}
        />
      ))}
    </>
  );
}

interface ExistingNoteProps {
  noteInput: string;
  onSave: (note: string) => void;
}

function ExistingNote({ noteInput, onSave }: ExistingNoteProps) {
  const [note, setNote] = useState(noteInput);
  return (
    <Stack direction={"row"}>
      <Input
        value={note}
        onChange={(event) => {
          setNote(event.target.value);
        }}
      ></Input>
      <Button onClick={() => onSave(note)}>Save</Button>
    </Stack>
  );
}

interface NewNoteProps {
  onSave: (note: string) => void;
}

function NewNote({ onSave }: NewNoteProps) {
  const [isAddingNewNote, setIsAddingNewNote] = useState(false);
  const [text, setText] = useState("");

  function handleSave() {
    onSave(text);
    setText("");
    setIsAddingNewNote(false);
  }

  return (
    <Box>
      {isAddingNewNote ? (
        <Stack direction={"column"}>
          <Input
            placeholder="please input your note"
            value={text}
            onChange={(event) => setText(event.target.value)}
            sx={{ width: 100 }}
          ></Input>
          <Button onClick={handleSave} fullWidth>
            Save note
          </Button>
        </Stack>
      ) : (
        <Button onClick={() => setIsAddingNewNote(true)}>Add new Note</Button>
      )}
    </Box>
  );
}
