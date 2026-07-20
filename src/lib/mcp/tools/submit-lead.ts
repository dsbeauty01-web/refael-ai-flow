import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const N8N_LEAD_WEBHOOK = "https://rafa5555.app.n8n.cloud/webhook/lead-email";

export default defineTool({
  name: "submit_lead",
  title: "Submit a lead to Refael.ai",
  description: "Send a prospective customer's name and WhatsApp/phone to Refael.ai so the team can reply within one hour. Use this only when the person has explicitly asked to be contacted.",
  inputSchema: {
    name: z.string().min(1).describe("Full name of the person to contact."),
    phone: z.string().min(6).describe("WhatsApp-capable phone number in international format, e.g. +9725XXXXXXXX."),
    note: z.string().optional().describe("Optional short message about what they want."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  handler: async ({ name, phone, note }) => {
    const res = await fetch(N8N_LEAD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, note: note ?? "", source: "mcp" }),
    });
    if (!res.ok) {
      return {
        content: [{ type: "text", text: `Failed to submit lead: ${res.status} ${res.statusText}` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: `Lead received for ${name}. Refael will reply within one hour.` }],
    };
  },
});