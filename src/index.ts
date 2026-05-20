#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { paradigmsData } from './data/paradigms.js';
import { principlesData } from './data/principles.js';
import { modalitiesData } from './data/modalities.js';
import { uxLawsData } from './data/ux-laws.js';
import { nielsenHeuristicsData } from './data/nielsen-heuristics.js';
import { caseStudiesData } from './data/case-studies.js';
import { resourcesData } from './data/resources.js';

const server = new Server(
  {
    name: 'ai-blueprint-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  }
);

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'aiblueprint://paradigms',
        name: 'AI Design Paradigms',
        description: '6 fundamental interaction models between humans and AI',
        mimeType: 'application/json',
      },
      {
        uri: 'aiblueprint://principles',
        name: 'AI Design Principles',
        description: '12 core principles for responsible AI design',
        mimeType: 'application/json',
      },
      {
        uri: 'aiblueprint://modalities',
        name: 'AI Modalities',
        description: '6 information channels for human-AI interaction',
        mimeType: 'application/json',
      },
      {
        uri: 'aiblueprint://ux-laws',
        name: 'UX Laws & Principles',
        description: '30 essential UX laws from psychology and research',
        mimeType: 'application/json',
      },
      {
        uri: 'aiblueprint://nielsen-heuristics',
        name: "Nielsen's 10 Usability Heuristics",
        description: 'Classic usability principles with AI-era context',
        mimeType: 'application/json',
      },
      {
        uri: 'aiblueprint://case-studies',
        name: 'AI Design Case Studies',
        description: 'Real-world examples of AI design paradigms in action',
        mimeType: 'application/json',
      },
      {
        uri: 'aiblueprint://resources',
        name: 'AI Design Resources',
        description: 'Curated external resources for AI design learning',
        mimeType: 'application/json',
      },
    ],
  };
});

// Read specific resources
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  let content: any;
  let description: string;

  switch (uri) {
    case 'aiblueprint://paradigms':
      content = paradigmsData;
      description = '6 AI Design Paradigms: Conversational, Agentic, Co-Creation, Command-Based, Ambient, and Generative UI';
      break;
    case 'aiblueprint://principles':
      content = principlesData;
      description = '12 Core AI Design Principles for building responsible and effective AI systems';
      break;
    case 'aiblueprint://modalities':
      content = modalitiesData;
      description = '6 AI Modalities: Text, Voice, Gesture, Visual, Code, and Multimodal';
      break;
    case 'aiblueprint://ux-laws':
      content = uxLawsData;
      description = '30 Essential UX Laws and Principles';
      break;
    case 'aiblueprint://nielsen-heuristics':
      content = nielsenHeuristicsData;
      description = "Nielsen's 10 Usability Heuristics for User Interface Design";
      break;
    case 'aiblueprint://case-studies':
      content = caseStudiesData;
      description = 'Real-world AI Design Case Studies';
      break;
    case 'aiblueprint://resources':
      content = resourcesData;
      description = 'Curated AI Design Resources';
      break;
    default:
      throw new Error(`Unknown resource: ${uri}`);
  }

  return {
    contents: [
      {
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(content, null, 2),
      },
    ],
  };
});

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'search_paradigms',
        description: 'Search AI design paradigms by keyword or get details about a specific paradigm',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query or paradigm name (conversational, agentic, co-creation, command, ambient, generative-ui)',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_principles',
        description: 'Get AI design principles, optionally filtered by keyword',
        inputSchema: {
          type: 'object',
          properties: {
            keyword: {
              type: 'string',
              description: 'Optional keyword to filter principles',
            },
          },
        },
      },
      {
        name: 'search_ux_laws',
        description: 'Search UX laws and principles by keyword or category',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query for UX laws',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_design_recommendations',
        description: 'Get AI design recommendations for a specific use case or interaction type',
        inputSchema: {
          type: 'object',
          properties: {
            use_case: {
              type: 'string',
              description: 'Description of the use case or interaction you want to design',
            },
          },
          required: ['use_case'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'search_paradigms': {
      const query = (args as any).query.toLowerCase();
      const results = paradigmsData.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.id.includes(query)
      );
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }

    case 'get_principles': {
      const keyword = (args as any).keyword?.toLowerCase();
      const results = keyword
        ? principlesData.filter((p) => p.toLowerCase().includes(keyword))
        : principlesData;
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }

    case 'search_ux_laws': {
      const query = (args as any).query.toLowerCase();
      const results = uxLawsData.filter(
        (law) =>
          law.name.toLowerCase().includes(query) ||
          law.description.toLowerCase().includes(query) ||
          law.category.toLowerCase().includes(query)
      );
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }

    case 'get_design_recommendations': {
      const useCase = (args as any).use_case;
      // Simple keyword matching to recommend paradigms and principles
      const recommendations: any = {
        use_case: useCase,
        recommended_paradigms: [],
        recommended_principles: [],
        relevant_ux_laws: [],
      };

      // Logic to match use cases to paradigms
      if (useCase.toLowerCase().includes('chat') || useCase.toLowerCase().includes('conversation')) {
        const paradigm = paradigmsData.find((p) => p.id === 'conversational');
        if (paradigm) recommendations.recommended_paradigms.push(paradigm);
      }
      if (useCase.toLowerCase().includes('autonom') || useCase.toLowerCase().includes('agent')) {
        const paradigm = paradigmsData.find((p) => p.id === 'agentic');
        if (paradigm) recommendations.recommended_paradigms.push(paradigm);
      }
      if (useCase.toLowerCase().includes('creat') || useCase.toLowerCase().includes('generat')) {
        const paradigm = paradigmsData.find((p) => p.id === 'co-creation');
        if (paradigm) recommendations.recommended_paradigms.push(paradigm);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(recommendations, null, 2),
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// List available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: 'design_review',
        description: 'Review an AI interface design against AI Blueprint principles and paradigms',
        arguments: [
          {
            name: 'design_description',
            description: 'Description of the AI interface or feature to review',
            required: true,
          },
        ],
      },
      {
        name: 'paradigm_selection',
        description: 'Help select the right AI paradigm for a specific use case',
        arguments: [
          {
            name: 'use_case',
            description: 'Description of the use case or problem to solve',
            required: true,
          },
        ],
      },
      {
        name: 'principle_application',
        description: 'Guide on how to apply AI design principles to a specific feature',
        arguments: [
          {
            name: 'feature_description',
            description: 'Description of the feature or interaction',
            required: true,
          },
        ],
      },
    ],
  };
});

// Handle prompt requests
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'design_review': {
      const designDescription = (args as any)?.design_description || '';
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Review this AI interface design against AI Blueprint principles and paradigms:\n\n${designDescription}\n\nConsider:\n1. Which paradigm(s) does this align with?\n2. Which principles are well-applied?\n3. Which principles might be violated or need attention?\n4. What UX laws are relevant?\n5. Recommendations for improvement`,
            },
          },
        ],
      };
    }

    case 'paradigm_selection': {
      const useCase = (args as any)?.use_case || '';
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Help me select the right AI paradigm for this use case:\n\n${useCase}\n\nAvailable paradigms:\n${paradigmsData.map((p) => `- ${p.name}: ${p.description}`).join('\n')}\n\nWhich paradigm(s) would work best and why?`,
            },
          },
        ],
      };
    }

    case 'principle_application': {
      const featureDescription = (args as any)?.feature_description || '';
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Guide me on applying AI design principles to this feature:\n\n${featureDescription}\n\nCore principles to consider:\n${principlesData.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nWhich principles are most relevant and how should they be applied?`,
            },
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown prompt: ${name}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('AI Blueprint MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
