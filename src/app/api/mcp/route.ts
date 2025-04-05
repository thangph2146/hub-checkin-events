import { startMcpServer } from '@/lib/mcp/server';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    await startMcpServer();
    return NextResponse.json({ message: 'MCP Server started successfully' });
  } catch (error) {
    console.error('Failed to start MCP server:', error);
    return NextResponse.json(
      { error: 'Failed to start MCP server' },
      { status: 500 }
    );
  }
} 