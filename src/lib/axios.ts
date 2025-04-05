import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL || ''

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

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý response data
    return response
  },
  (error) => {
    // Xử lý error response
    if (error.response) {
      // Lỗi từ server với status code
      console.error('Response Error:', error.response.data)
    } else if (error.request) {
      // Không nhận được response
      console.error('Request Error:', error.request)
    } else {
      // Lỗi khi setup request
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
) 