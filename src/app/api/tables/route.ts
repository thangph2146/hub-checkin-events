import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const result = await prisma.$queryRaw`
      SELECT 
        table_name,
        (
          SELECT json_agg(row_to_json(cols))
          FROM (
            SELECT 
              column_name,
              data_type,
              character_maximum_length,
              column_default,
              is_nullable,
              col_description((table_schema || '.' || table_name)::regclass, ordinal_position) as description
            FROM information_schema.columns c
            WHERE c.table_name = t.table_name
            AND c.table_schema = 'public'
            ORDER BY ordinal_position
          ) cols
        ) as columns,
        obj_description((table_schema || '.' || table_name)::regclass, 'pg_class') as table_description
      FROM information_schema.tables t
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching tables:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 