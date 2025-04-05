import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

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
async function getAllTables() {
  // Implement using your TablesService
  return [];
}

async function getDatabaseStatus() {
  // Implement database status check
  return { status: 'healthy' };
}

async function exportSchema() {
  // Implement schema export logic
  return {};
}

async function getTableDetails(tableName: string) {
  // Implement table details retrieval
  return { name: tableName };
}

async function getSchemaInFormat(formatType: string) {
  // Implement schema format conversion
  return { format: formatType };
}

// Khởi động server với StdioServerTransport
export async function startMcpServer() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.warn('MCP Server started');
} 