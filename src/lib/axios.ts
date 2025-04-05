import axios, { AxiosError } from 'axios'

const baseURL = process.env['NEXT_PUBLIC_API_URL'] ?? ''

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

interface ErrorResponse {
  message: string;
  status: number;
}

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.config.url)
    return response
  },
  (error: AxiosError) => {
    let errorMessage = 'Đã xảy ra lỗi'

    if (error.response) {
      const response = error.response as { data?: ErrorResponse }
      errorMessage = response.data?.message ?? 'Lỗi từ server'
      console.error('Response Error:', error.response.status, error.response.data)
    } else if (error.request) {
      errorMessage = 'Không thể kết nối đến server'
      console.error('Request Error:', error.request)
    } else {
      errorMessage = error.message || 'Lỗi không xác định'
      console.error('Error:', error.message)
    }

    return Promise.reject(errorMessage)
  }
)

export default axiosInstance 