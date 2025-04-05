import axios, { AxiosError } from 'axios'

const baseURL = process.env['NEXT_PUBLIC_API_URL'] ?? ''

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm xử lý trước khi gửi request
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

interface ErrorResponse {
  message: string;
  status: number;
}

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let errorMessage = 'Đã xảy ra lỗi'

    if (error.response) {
      const response = error.response as { data?: ErrorResponse }
      errorMessage = response.data?.message ?? 'Lỗi từ server'
    } else if (error.request) {
      errorMessage = 'Không thể kết nối đến server'
    } else {
      errorMessage = error.message || 'Lỗi không xác định'
    }

    return Promise.reject(errorMessage)
  }
)

export default axiosInstance 