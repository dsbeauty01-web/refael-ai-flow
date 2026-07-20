import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_services",
  title: "List Refael.ai services",
  description: "Returns Refael.ai's public service offerings and pricing (live AI avatars, WhatsApp/Messenger bots, custom integrations) as marketed on the landing page.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{
      type: "text",
      text: JSON.stringify({
        services: [
          { name: "Live AI Avatar", description: "Interactive video avatar that greets and qualifies visitors on your site.", setup_ils: 9500, monthly_ils: 1490 },
          { name: "WhatsApp / Messenger AI Bot", description: "Automated chat bot connected to your business flows.", pricing: "on request" },
          { name: "Custom AI integrations", description: "n8n workflows, RAG, kiosk deployments.", pricing: "on request" },
        ],
        currency: "ILS",
        includes_free_consultation: true,
      }, null, 2),
    }],
  }),
});