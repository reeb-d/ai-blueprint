# AI Blueprint MCP Server

An MCP (Model Context Protocol) server that provides programmatic access to the AI Blueprint design knowledge base.

## What is this?

This MCP server exposes all the AI design knowledge from the AI Blueprint website through a standardized protocol that AI assistants can use. It includes:

- **6 AI Design Paradigms**: Conversational, Agentic, Co-Creation, Command-Based, Ambient, and Generative UI
- **12 Design Principles**: Core guidelines for responsible AI design
- **6 Modalities**: Text, Voice, Gesture, Visual, Code, and Multimodal
- **30 UX Laws**: Essential principles from psychology and research
- **Nielsen's 10 Heuristics**: Classic usability principles with AI context
- **Case Studies**: Real-world examples of AI design paradigms
- **Curated Resources**: External learning materials and thought leaders

## Installation

```bash
cd mcp-server
pnpm install
pnpm build
```

## Usage

### As a Claude Desktop MCP Server

Add to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "ai-blueprint": {
      "command": "node",
      "args": ["/path/to/ai-blueprint/mcp-server/dist/index.js"]
    }
  }
}
```

### With the MCP SDK

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['/path/to/ai-blueprint/mcp-server/dist/index.js'],
});

const client = new Client({
  name: 'my-app',
  version: '1.0.0',
}, {
  capabilities: {},
});

await client.connect(transport);
```

## Features

### Resources

Access the full knowledge base:

- `aiblueprint://paradigms` - All 6 AI design paradigms
- `aiblueprint://principles` - All 12 design principles
- `aiblueprint://modalities` - All 6 modalities
- `aiblueprint://ux-laws` - 30 UX laws and principles
- `aiblueprint://nielsen-heuristics` - Nielsen's 10 heuristics
- `aiblueprint://case-studies` - Real-world case studies
- `aiblueprint://resources` - External learning resources

### Tools

Query and search the knowledge base:

- **search_paradigms**: Search paradigms by keyword or get details about a specific one
- **get_principles**: Get principles, optionally filtered by keyword
- **search_ux_laws**: Search UX laws by keyword or category
- **get_design_recommendations**: Get AI design recommendations for a specific use case

### Prompts

Pre-built prompts for common AI design tasks:

- **design_review**: Review an AI interface design against AI Blueprint principles
- **paradigm_selection**: Help select the right paradigm for a use case
- **principle_application**: Guide on applying principles to a specific feature

## Examples

### Getting All Paradigms

```typescript
const paradigms = await client.readResource({
  uri: 'aiblueprint://paradigms'
});
console.log(paradigms);
```

### Searching for Conversational Paradigm

```typescript
const result = await client.callTool({
  name: 'search_paradigms',
  arguments: { query: 'conversational' }
});
console.log(result);
```

### Getting Design Recommendations

```typescript
const recommendations = await client.callTool({
  name: 'get_design_recommendations',
  arguments: { use_case: 'chat interface for customer support' }
});
console.log(recommendations);
```

### Using the Design Review Prompt

```typescript
const prompt = await client.getPrompt({
  name: 'design_review',
  arguments: {
    design_description: 'An AI assistant that generates code without showing the user what it\'s doing'
  }
});
// Use prompt.messages with your LLM
```

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Development mode with watch
pnpm dev

# Test the server
node dist/index.js
```

## Use Cases

This MCP server enables:

- **AI Assistants** to reference AI Blueprint knowledge when helping users design AI products
- **Design Tools** to validate designs against established principles
- **Documentation** to stay synchronized with AI design best practices
- **Education** to provide structured learning paths through AI design concepts
- **Analysis** to evaluate existing AI products against design paradigms

## License

MIT

## Contributing

This MCP server is part of the AI Blueprint project. Contributions are welcome!
