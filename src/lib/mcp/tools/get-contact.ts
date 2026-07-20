import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact",
  title: "Get Refael.ai contact info",
  description: "Returns Refael.ai's public contact channels (Facebook Messenger, email, phone) so an assistant can direct an interested user to the right place.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{
      type: "text",
      text: JSON.stringify({
        messenger: "https://www.facebook.com/refael.silanikove",
        email: "dsbeauty01@gmail.com",
        phone: "+972-53-332-7125",
        offer: "Free 15-minute consultation — reply within 1 hour",
      }, null, 2),
    }],
  }),
});