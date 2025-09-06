# Puppeteer MCP Server

A Model Context Protocol (MCP) server that enables Cursor AI to fetch and analyze web page content using Puppeteer. Perfect for frontend development workflows where you need to inspect rendered HTML, debug components, or analyze live websites.

## 🚀 Features

- **Web Page Fetching**: Retrieve complete HTML source of any URL
- **Cursor Integration**: Seamlessly works with Cursor AI agent
- **Puppeteer Powered**: Uses headless Chrome for accurate rendering
- **TypeScript**: Fully typed and maintainable codebase
- **Simple CLI**: Easy-to-use command line interface

## 📋 Prerequisites

- Node.js 16+
- npm or yarn
- Cursor IDE

## 🛠️ Installation

1. **Clone or download this project**

```bash
git clone https://github.com/christophe77/puppeteer-mcp
cd puppeteer-mcp
```

2. **Install dependencies**

```bash
npm install
```

3. **Build the project**

```bash
npm run build
```

## ⚙️ Configuration

### Cursor MCP Setup

Add the following configuration to your Cursor MCP settings (`~/.cursor/mcp.json`):

```json
{
	"mcpServers": {
		"puppeteer-mcp": {
			"command": "node",
			"args": ["C:\\path\\to\\your\\puppeteer-mcp\\dist\\puppeteer-mcp.js"]
		}
	}
}
```

**Important**: Replace `C:\\path\\to\\your\\puppeteer-mcp` with your actual project path.

### Restart Cursor

After updating the configuration, restart Cursor completely for the changes to take effect.

## 🎯 Usage

### Method 1: Direct MCP Call (in Cursor)

```
@mcp puppeteer-mcp.fetchPageSource {"url": "https://example.com"}
```

### Method 2: NPM Script (Recommended)

```bash
npm run fetch https://example.com
```

### Method 3: Windows Batch File

```cmd
fetch.bat https://example.com
```

## 💡 Use Cases & Examples

### 1. Frontend Development Debugging

**Scenario**: Your React/Next.js component isn't rendering correctly

**Problem**:

```
The Header component logo is invisible. Check the code and fetch http://localhost:3000
```

**Solution**:

1. Use the MCP tool to fetch the rendered HTML
2. Compare with your component code
3. Identify CSS issues, missing classes, or rendering problems

**Example**:

```
@mcp puppeteer-mcp.fetchPageSource {"url": "http://localhost:3000"}
```

### 2. Component Analysis

**Scenario**: Debugging a complex component structure

**Use Cases**:

- Verify if dynamic content is properly rendered
- Check if conditional rendering works as expected
- Analyze the final DOM structure
- Debug CSS-in-JS or styled-components output

### 3. SEO & Meta Tag Verification

**Scenario**: Ensuring proper meta tags and SEO elements

**Example**:

```
@mcp puppeteer-mcp.fetchPageSource {"url": "https://myapp.com/product/123"}
```

**What to look for**:

- Meta descriptions
- Open Graph tags
- Structured data
- Title tags

### 4. Cross-Browser Testing

**Scenario**: Verify how your app renders in different environments

**Use Cases**:

- Check if CSS Grid/Flexbox works correctly
- Verify responsive design
- Test JavaScript functionality
- Validate accessibility attributes

### 5. Third-Party Integration Testing

**Scenario**: Testing external widget or API integrations

**Examples**:

- Payment gateway integration
- Analytics tracking
- Chat widgets
- Social media embeds

### 6. Performance Analysis

**Scenario**: Analyzing page structure for optimization

**What to analyze**:

- DOM complexity
- Unused CSS
- Inline styles
- Script loading order

## 🔧 Development

### Available Scripts

```bash
# Build TypeScript
npm run build

# Build and watch for changes
npm run build:watch

# Start MCP server
npm start

# Development mode (build + watch + start)
npm run dev

# Fetch a webpage (simplified CLI)
npm run fetch <URL>
```

### Project Structure

```
chrome-mcp/
├── src/
│   └── puppeteer-mcp.ts    # Main MCP server
├── dist/                   # Compiled JavaScript
├── fetch-web.js           # CLI wrapper script
├── fetch.bat              # Windows batch file
├── package.json
├── tsconfig.json
└── README.md
```

## 🐛 Troubleshooting

### "No tools or prompts" in Cursor

1. **Check the file path** in `mcp.json` - use absolute path
2. **Restart Cursor** completely
3. **Verify the build** - run `npm run build`
4. **Test manually** - run `npm run fetch <URL>`

### Server not responding

1. **Check Node.js version** - requires 16+
2. **Verify dependencies** - run `npm install`
3. **Check Puppeteer** - it may need to download Chrome

### Permission issues

1. **Run as administrator** if needed
2. **Check file permissions** on the project directory
3. **Verify antivirus** isn't blocking the process

## 📚 Advanced Usage

### Custom Puppeteer Options

You can modify `src/puppeteer-mcp.ts` to add custom Puppeteer options:

```typescript
const browser = await puppeteer.launch({
	headless: true,
	args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
```

### Adding More Tools

Extend the MCP server with additional tools:

```typescript
server.registerTool(
	'screenshot',
	{
		title: 'Take Screenshot',
		description: 'Capture a screenshot of a webpage',
		inputSchema: { url: z.string() },
	},
	async ({ url }) => {
		// Implementation here
	},
);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC License - see package.json for details

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section
2. Verify your Cursor MCP configuration
3. Test with a simple URL first
4. Check the console for error messages

---

**Happy coding with Cursor AI! 🚀**
