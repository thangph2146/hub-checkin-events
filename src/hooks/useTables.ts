import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { TablesService, Table } from '@/services/tables.service'

export const TABLES_QUERY_KEY = ['tables']

export function useTables(): UseQueryResult<Table[]> {
  return useQuery<Table[]>({
    queryKey: TABLES_QUERY_KEY,
    queryFn: async () => {
      try {
        console.log('Fetching tables...')
        const data = await TablesService.getAllTables()
        console.log('Tables fetched:', data)
        return data
      } catch (error) {
        console.error('Error fetching tables:', error)
        throw error
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1
  })
} 