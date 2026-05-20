# AI Blueprint MCP Server - Local Setup Guide

## Step 1: Export These Files

You need to copy the entire `mcp-server` folder from Figma Make to your local computer. The folder contains:

```
mcp-server/
├── src/
│   ├── index.ts
│   └── data/
│       ├── paradigms.ts
│       ├── principles.ts
│       ├── modalities.ts
│       ├── ux-laws.ts
│       ├── nielsen-heuristics.ts
│       ├── case-studies.ts
│       └── resources.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Step 2: Install Dependencies

Open your terminal and navigate to the `mcp-server` folder:

```bash
cd path/to/mcp-server
npm install
```

Or if you use pnpm:

```bash
pnpm install
```

## Step 3: Build the Server

```bash
npm run build
```

This will create a `dist/` folder with compiled JavaScript files.

## Step 4: Test the Server (Optional)

Test that it works:

```bash
node dist/index.js
```

You should see: `AI Blueprint MCP server running on stdio`

Press `Ctrl+C` to stop it.

## Step 5: Configure Claude Desktop

### Find your config file:

**macOS:**
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**
```bash
%APPDATA%\Claude\claude_desktop_config.json
```

### Edit the config file:

If the file doesn't exist, create it. Add this configuration (replace `/path/to/` with your actual path):

```json
{
  "mcpServers": {
    "ai-blueprint": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/dist/index.js"]
    }
  }
}
```

**Example on macOS:**
```json
{
  "mcpServers": {
    "ai-blueprint": {
      "command": "node",
      "args": ["/Users/yourname/Projects/mcp-server/dist/index.js"]
    }
  }
}
```

**Example on Windows:**
```json
{
  "mcpServers": {
    "ai-blueprint": {
      "command": "node",
      "args": ["C:\\Users\\yourname\\Projects\\mcp-server\\dist\\index.js"]
    }
  }
}
```

## Step 6: Restart Claude Desktop

Completely quit and restart Claude Desktop.

## Step 7: Verify It's Working

In Claude Desktop, you should now be able to ask Claude to:

- "Search AI Blueprint paradigms for conversational interfaces"
- "Get AI design principles related to transparency"
- "Review my AI interface design against AI Blueprint principles"

Claude will now have access to all the AI Blueprint knowledge!

## Troubleshooting

### "Cannot find module" error

Make sure you ran `npm run build` and the `dist/` folder exists.

### Claude doesn't see the MCP server

1. Check that the path in your config is **absolute** (starts with `/` on macOS/Linux or `C:\` on Windows)
2. Make sure there are no typos in the config file
3. Verify the config file is valid JSON (use a JSON validator)
4. Restart Claude Desktop completely

### "tsc not found" during build

Run `npm install` again to ensure TypeScript is installed.

## Usage Examples

Once set up, Claude can:

```
You: "What are the 6 AI design paradigms?"
Claude: [Accesses aiblueprint://paradigms resource]

You: "Which paradigm should I use for a chat interface?"
Claude: [Uses search_paradigms tool]

You: "Review this design: An AI that generates code silently without showing progress"
Claude: [Uses design_review prompt with AI Blueprint principles]
```

## Need Help?

If you encounter issues, check:
- Node.js is installed (`node --version`)
- The path in the config is correct and absolute
- The JSON config file has no syntax errors
- You've restarted Claude Desktop after changing the config
