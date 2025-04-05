export const API_ENDPOINTS = {
  TABLES: {
    GET_ALL: '/api/tables'
  },
  // Thêm các endpoint khác ở đây
} as const

export type ApiEndpoints = typeof API_ENDPOINTS 