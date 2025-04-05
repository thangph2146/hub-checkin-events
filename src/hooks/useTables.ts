import { useQuery, useQueryClient, type UseQueryResult, type UseQueryOptions } from '@tanstack/react-query'
import { TablesService, type Table } from '@/services/tables.service'

export const TABLES_QUERY_KEY = ['tables'] as const

interface UseTablesResult extends Omit<UseQueryResult<Table[], Error>, 'data'> {
  tables: Table[]
  refreshTables: () => Promise<void>
}

interface UseTablesOptions {
  initialData?: Table[]
}

export function useTables(options: UseTablesOptions = {}): UseTablesResult {
  const queryClient = useQueryClient()

  const queryOptions: UseQueryOptions<Table[], Error> = {
    queryKey: TABLES_QUERY_KEY,
    queryFn: TablesService.getAllTables,
    initialData: options.initialData ?? [],
    gcTime: 1000 * 60 * 30, // 30 phút
    staleTime: 1000 * 60 * 5, // 5 phút
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  }

  const query = useQuery<Table[], Error>(queryOptions)

  const refreshTables = async () => {
    await queryClient.invalidateQueries({ queryKey: TABLES_QUERY_KEY })
  }

  return {
    ...query,
    refreshTables,
    tables: Array.isArray(query.data) ? query.data : [],
  }
} 