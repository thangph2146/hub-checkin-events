import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(): Promise<NextResponse> {
  try {
    console.log('Processing GET /api/tables request')

    const tables = await prisma.$queryRaw`
      SELECT 
        t.table_name,
        t.table_schema,
        json_agg(
          json_build_object(
            'column_name', c.column_name,
            'data_type', c.data_type,
            'character_maximum_length', c.character_maximum_length,
            'column_default', c.column_default,
            'is_nullable', c.is_nullable,
            'description', col_description((t.table_schema || '.' || t.table_name)::regclass, c.ordinal_position)
          ) ORDER BY c.ordinal_position
        ) as columns
      FROM information_schema.tables t
      JOIN information_schema.columns c 
        ON c.table_name = t.table_name 
        AND c.table_schema = t.table_schema
      WHERE t.table_schema = 'public'
        AND t.table_type = 'BASE TABLE'
      GROUP BY t.table_schema, t.table_name
      ORDER BY t.table_name;
    `

    console.log('Successfully retrieved tables:', tables)
    return NextResponse.json(tables)
  } catch (error) {
    console.error('Error in GET /api/tables:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 