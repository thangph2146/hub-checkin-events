import { useTables } from '@/hooks/useTables'
import { Table, Column } from '@/services/tables.service'

export default function TableList() {
  const { data: tables = [], isLoading, isError, error } = useTables()

  console.log('TableList render:', { tables, isLoading, isError, error })

 
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Danh sách bảng</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tables.map((table: Table) => (
          <div key={table.table_name} className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">{table.table_name}</h3>
            <div className="mt-2 space-y-2">
              {table.columns.map((column: Column) => (
                <div key={column.column_name} className="text-sm">
                  <span className="font-medium">{column.column_name}</span>
                  <span className="ml-2 text-gray-500">({column.data_type})</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 