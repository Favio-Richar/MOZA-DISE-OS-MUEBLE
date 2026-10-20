import { FormEvent, useState } from "react";
import { track } from "../lib/analytics";
import { submitLead } from "../lib/leads";

export type LeadStatus = "idle" | "loading" | "success" | "error";

/** Estado y envío de un formulario: validación nativa, loading, éxito y error. */
export default function useLeadForm(source: string) {
  const [status, setStatus] = useState<LeadStatus>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("loading");
    try {
      await submitLead(new FormData(form), source);
      track("generate_lead", { origen: source });
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return { status, setStatus, onSubmit, loading: status === "loading" };
}
