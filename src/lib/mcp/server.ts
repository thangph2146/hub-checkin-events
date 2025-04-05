import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { prisma } from '@/lib/prisma'

// Tạo MCP server instance
export const mcpServer = new McpServer({
  name: "Database Console",
  version: "1.0.0",
});

// Tool để thao tác với tables
mcpServer.tool(
  "tables",
  "Tool để thao tác với các bảng trong database",
  async (_extra) => {
    const result = await getAllTables();
    return {
      content: [{ 
        type: "text",
        text: JSON.stringify(result)
      }]
    };
  }
);

// Tool để kiểm tra trạng thái database
mcpServer.tool(
  "database",
  "Tool để kiểm tra trạng thái của database",
  async (_extra) => {
    const status = await getDatabaseStatus();
    return {
      content: [{ 
        type: "text",
        text: JSON.stringify(status)
      }]
    };
  }
);

// Tool để làm việc với schema
mcpServer.tool(
  "schema",
  "Tool để làm việc với schema của database",
  async (_extra) => {
    const schema = await exportSchema();
    return {
      content: [{ 
        type: "text",
        text: JSON.stringify(schema)
      }]
    };
  }
);

// Resource template cho tables
mcpServer.resource(
  "table",
  "table://{tableName}",
  async (uri: URL) => {
    const tableName = uri.pathname.split('/').pop() || '';
    const details = await getTableDetails(tableName);
    return {
      contents: [{
        uri: uri.href,
        text: JSON.stringify(details)
      }]
    };
  }
);

// Resource template cho schema
mcpServer.resource(
  "schema",
  "schema://{format}",
  async (uri: URL) => {
    const formatType = uri.pathname.split('/').pop() || 'json';
    const schema = await getSchemaInFormat(formatType);
    return {
      contents: [{
        uri: uri.href,
        text: JSON.stringify(schema)
      }]
    };
  }
);

// Helper functions
async function getAllTables(): Promise<unknown[]> {
  // Implement using your TablesService
  return [];
}

async function getDatabaseStatus(): Promise<{ status: string }> {
  // Implement database status check
  return { status: 'healthy' };
}

async function exportSchema(): Promise<Record<string, unknown>> {
  // Implement schema export logic
  return {};
}

// Kiểm tra giá trị nullable string
const validateString = (value: string | null | undefined): string => {
  return value ?? ''
}

// Trong các hàm, thay thế || bằng ??
const getTableDetails = async (tableName: string): Promise<unknown> => {
  const table = await prisma.$queryRaw`
    SELECT * FROM information_schema.columns 
    WHERE table_name = ${validateString(tableName)};
  `
  return table
}

const getSchemaInFormat = async (format: string): Promise<unknown> => {
  const schema = await prisma.$queryRaw`
    SELECT * FROM information_schema.tables 
    WHERE table_schema = ${validateString(format)};
  `
  return schema
}

// Khởi động server với StdioServerTransport
export async function startMcpServer(): Promise<void> {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.warn('MCP Server started');
} 