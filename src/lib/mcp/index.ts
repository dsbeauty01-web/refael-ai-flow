import { defineMcp } from "@lovable.dev/mcp-js";
import getContactTool from "./tools/get-contact";
import getServicesTool from "./tools/get-services";
import submitLeadTool from "./tools/submit-lead";

export default defineMcp({
  name: "refael-ai-mcp",
  title: "Refael.ai",
  version: "0.1.0",
  instructions:
    "Public MCP for Refael.ai — a Hebrew/English AI agency landing page. Use `get_services` to describe offerings and pricing, `get_contact` for contact channels, and `submit_lead` only when the user explicitly asks to be contacted.",
  tools: [getContactTool, getServicesTool, submitLeadTool],
});