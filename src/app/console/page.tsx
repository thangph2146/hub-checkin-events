'use client'

import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTables } from '@/hooks/useTables'

// Thêm hàm helper để kiểm tra giá trị
const isNonEmptyString = (value: string | null | undefined): boolean => {
  return typeof value === 'string' && value.length > 0
}

function TableList() {
  const { tables, refreshTables } = useTables()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Thông tin bảng dữ liệu</h1>
        <button
          onClick={() => void refreshTables()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Làm mới
        </button>
      </div>
      
      {tables.map((table) => (
        <div key={table.table_name} className="mb-4 p-4 border rounded">
          <h3 className="text-xl font-bold mb-2">
            {isNonEmptyString(table.table_name) ? table.table_name : 'Không có tên'}
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Tên bảng:</p>
              <p>{table.table_name}</p>
            </div>
            
            <div>
              <p className="font-semibold">Mô tả:</p>
              <p>{isNonEmptyString(table.table_description) ? table.table_description : 'Không có mô tả'}</p>
            </div>
            
            <div>
              <p className="font-semibold">Số cột:</p>
              <p>{table.columns.length}</p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Danh sách cột:</h4>
            <div className="grid gap-2">
              {table.columns.map(column => (
                <div key={column.column_name} className="p-2 bg-gray-50 rounded">
                  <p><span className="font-medium">Tên cột:</span> {column.column_name}</p>
                  <p><span className="font-medium">Kiểu dữ liệu:</span> {column.data_type}</p>
                  <p><span className="font-medium">Cho phép NULL:</span> {column.is_nullable === 'YES' ? 'Có' : 'Không'}</p>
                  {column.description && <p><span className="font-medium">Mô tả:</span> {column.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-50 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Lỗi khi tải dữ liệu
            </h3>
            <div className="mt-2 text-sm text-red-700">
              {error.message}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Console() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <TableList />
      </Suspense>
    </ErrorBoundary>
  )
} 