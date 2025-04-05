import { axiosInstance } from '@/lib/axios'
import { API_ENDPOINTS } from '@/config/api-endpoints'

export interface Table {
  table_name: string
  table_schema: string
  columns: Column[]
}

export interface Column {
  column_name: string
  data_type: string
  character_maximum_length: number | null
  column_default: string | null
  is_nullable: string
  description: string | null
}

export const TablesService = {
  async getAllTables(): Promise<Table[]> {
    try {
      console.log('Calling getAllTables API...')
      const { data } = await axiosInstance.get<Table[]>(API_ENDPOINTS.TABLES.GET_ALL)
      console.log('getAllTables API response:', data)
      return data
    } catch (error) {
      console.error('Error in getAllTables:', error)
      throw error
    }
  }
} 