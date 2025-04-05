'use client';

import { useTables } from '@/hooks/useTables'
import { Table, Column } from '@/services/tables.service'
import { useState } from 'react'
import { Search, Users, Clock, ChevronDown, ChevronUp, Eye } from 'lucide-react'
import LoadingFallback from './LoadingFallback'
import ErrorFallback from './ErrorFallback'

interface TableListProps {
  onTableSelect?: (table: Table) => void;
}

export default function TableList({ onTableSelect }: TableListProps): JSX.Element {
  const { data: tables = [], isLoading, isError, error, refetch } = useTables()
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set())

  if (isLoading) return <LoadingFallback message="Đang tải danh sách bảng..." />
  if (isError) return <ErrorFallback error={error} resetErrorBoundary={refetch} />

  const filteredTables = tables
    .filter(table => 
      table.table_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const toggleTableExpand = (tableName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedTables(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tableName)) {
        newSet.delete(tableName);
      } else {
        newSet.add(tableName);
      }
      return newSet;
    });
  }

  const isTableExpanded = (tableName: string) => expandedTables.has(tableName);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Danh sách bảng</h2>
        
        <div className="flex items-center space-x-4">
          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm bảng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* No results state */}
      {filteredTables.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Không tìm thấy bảng</h3>
          <p className="mt-2 text-gray-500">
            Không tìm thấy bảng nào phù hợp với từ khóa "{searchTerm}"
          </p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTables.map((table: Table) => (
          <div 
            key={table.table_name}
            onClick={() => onTableSelect?.(table)}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 cursor-pointer group overflow-hidden"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                    {table.table_name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Eye size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-400">12</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
                    {table.columns.length} cột
                  </span>
                  <button
                    onClick={(e) => toggleTableExpand(table.table_name, e)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    title={isTableExpanded(table.table_name) ? "Thu nhỏ" : "Mở rộng"}
                  >
                    {isTableExpanded(table.table_name) ? (
                      <ChevronUp size={16} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className={`space-y-2.5 transition-all duration-300 ${
                isTableExpanded(table.table_name) ? 'max-h-[500px]' : 'max-h-[100px]'
              } overflow-hidden`}>
                {table.columns.map((column: Column, index: number) => (
                  <div 
                    key={column.column_name}
                    className={`flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors duration-150 ${
                      !isTableExpanded(table.table_name) && index >= 3 ? 'opacity-50' : ''
                    }`}
                  >
                    <span className="font-medium text-gray-700">{column.column_name}</span>
                    <span className="text-sm px-2 py-1 bg-gray-100 rounded text-gray-600">
                      {column.data_type}
                    </span>
                  </div>
                ))}
                {!isTableExpanded(table.table_name) && table.columns.length > 3 && (
                  <div className="text-center text-sm text-gray-500 pt-2">
                    + {table.columns.length - 3} cột khác
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users size={16} />
                  <span>3 người dùng</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span>2 phút trước</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 