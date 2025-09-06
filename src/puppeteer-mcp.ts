import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import puppeteer from "puppeteer";
import { z } from "zod";

// Création du serveur MCP
const server = new McpServer({
  name: "puppeteer-mcp",
  version: "1.0.0"
});

// Définir une "tool" que Cursor peut appeler
server.registerTool("fetchPageSource",
  {
    title: "Fetch Page Source",
    description: "Ouvre une URL avec Puppeteer et retourne le code source de la page",
    inputSchema: { url: z.string() }
  },
  async ({ url }) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const content = await page.content();
    await browser.close();

    return {
      content: [{
        type: "text",
        text: content
      }]
    };
  }
);

// Lancer le serveur
async function startServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

startServer().catch(console.error);
