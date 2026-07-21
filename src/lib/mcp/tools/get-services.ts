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
          { name: "Website avatar", description: "A live full-body avatar holding a real Hebrew voice conversation on your site.", setup_ils: 2900, monthly_ils: 290 },
          { name: "Business station", description: "The avatar plus hands: real calendar booking, CRM/WhatsApp/Sheets via n8n, custom gestures, monthly analytics.", setup_ils: 6900, monthly_ils: 690 },
          { name: "Physical installation", description: "Full-size screen or hologram for a lobby, museum or showroom, with gestures calibrated to the room. Quoted per project.", setup_ils: 14900, monthly_ils: 990 },
          { name: "WhatsApp / Messenger AI Bot", description: "Automated chat bot connected to your business flows.", pricing: "on request" },
          { name: "Custom AI integrations", description: "n8n workflows, RAG, kiosk deployments.", pricing: "on request" },
        ],
        currency: "ILS",
        includes_free_consultation: true,
      }, null, 2),
    }],
  }),
});