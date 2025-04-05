import { axiosInstance } from '@/lib/axios'
import { API_ENDPOINTS } from '@/config/api-endpoints'

export interface TableColumn {
  column_name: string
  data_type: string
  character_maximum_length: number | null
  column_default: string | null
  is_nullable: string
  description: string | null
}

export interface Table {
  table_name: string
  columns: TableColumn[]
  table_description: string | null
}

export const TablesService = {
  async getAllTables() {
    const { data } = await axiosInstance.get<Table[]>(API_ENDPOINTS.TABLES.GET_ALL)
    return data
  },
} 