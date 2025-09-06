#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Récupérer l'URL depuis les arguments
const url = process.argv[2];

if (!url) {
  console.log('Usage: node fetch-web.js <URL>');
  console.log('Exemple: node fetch-web.js https://example.com');
  process.exit(1);
}

// Lancer le serveur MCP
const server = spawn('node', [path.join(__dirname, 'dist', 'puppeteer-mcp.js')], {
  stdio: ['pipe', 'pipe', 'pipe']
});

// Requête MCP pour appeler l'outil
const request = {
  jsonrpc: "2.0",
  id: 1,
  method: "tools/call",
  params: {
    name: "fetchPageSource",
    arguments: { url: url }
  }
};

// Envoyer la requête
server.stdin.write(JSON.stringify(request) + '\n');

// Afficher la réponse
server.stdout.on('data', (data) => {
  try {
    const response = JSON.parse(data.toString());
    if (response.result && response.result.content) {
      console.log('=== CONTENU DE LA PAGE ===');
      console.log(response.result.content[0].text);
    } else if (response.error) {
      console.error('Erreur:', response.error);
    }
  } catch (e) {
    // Ignorer les messages non-JSON
  }
});

server.stderr.on('data', (data) => {
  console.error('Erreur serveur:', data.toString());
});

server.on('close', () => {
  process.exit(0);
});

// Fermer après 10 secondes
setTimeout(() => {
  server.kill();
}, 10000);
