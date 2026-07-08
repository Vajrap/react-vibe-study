import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";

import {
  FormContainer,
  TextFieldElement,
  ToggleButtonGroupElement,
  useForm,
} from "react-hook-form-mui";

import { Ticket } from "../types";
import { useTicketContext } from "../context";

export type OpenType = { type: "new" } | { type: "exist"; ticket: Ticket };

export type TicketDeatilModalProps = {
  ticket: OpenType;
  onClose: () => void;
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

export default function TicketDetailModal(props: TicketDeatilModalProps) {
  const { allTickets, setAllTickets } = useTicketContext();
  const form = useForm<Ticket>({
    defaultValues:
      props.ticket.type === "exist" ? props.ticket.ticket : formDefaultValues(),
  });

  function handleSave() {
    const values = form.getValues();
    if (props.ticket.type === "new") {
      const nextId = Math.max(...allTickets.map((ticket) => ticket.id), 0) + 1;
      setAllTickets((previous) => [
        ...previous,
        {
          ...values,
          id: nextId,
        },
      ]);
      props.onClose();
    } else if (props.ticket.type === "exist") {
      setAllTickets((previous) =>
        previous.map((ticket) => (ticket.id === values.id ? values : ticket)),
      );
      props.onClose();
    }
  }

  return (
    <Dialog open>
      <FormContainer formContext={form} onSuccess={handleSave}>
        <DialogTitle>
          {props.ticket.type === "exist" ? "Update ticket" : "New ticket"}
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
            <TextFieldElement
              name="notes.0"
              label="Notes"
              multiline
              minRows={3}
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
          <Button onClick={props.onClose}>Close</Button>
          <Button
            disabled={!form.formState.isDirty}
            type="submit"
            variant="contained"
          >
          {props.ticket.type === "exist" ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </FormContainer>
    </Dialog>
  );
}
