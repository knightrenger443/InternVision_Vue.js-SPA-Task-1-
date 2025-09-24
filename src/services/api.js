import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add loading state or auth token if needed
    console.log('Making request to:', config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors
    const errorMessage = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
    }
    
    const status = error.response?.status
    const message = errorMessage[status] || 'Network Error'
    
    console.error('API Error:', {
      status,
      message,
      url: error.config?.url,
    })
    
    return Promise.reject({
      status,
      message,
      originalError: error,
    })
  }
)

// API Service Class
class ApiService {
  // Users
  async fetchUsers() {
    try {
      const response = await api.get('/users')
      return {
        success: true,
        data: response.data,
        error: null,
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to fetch users',
      }
    }
  }
  
  async fetchUser(id) {
    try {
      const response = await api.get(`/users/${id}`)
      return {
        success: true,
        data: response.data,
        error: null,
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to fetch user',
      }
    }
  }
  
  // Posts
  async fetchPosts(userId = null) {
    try {
      const url = userId ? `/posts?userId=${userId}` : '/posts'
      const response = await api.get(url)
      return {
        success: true,
        data: response.data,
        error: null,
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to fetch posts',
      }
    }
  }
  
  async createPost(post) {
    try {
      const response = await api.post('/posts', post)
      return {
        success: true,
        data: response.data,
        error: null,
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to create post',
      }
    }
  }
}

// Create and export instance
const apiService = new ApiService()
export default apiService

// Legacy export for backward compatibility
export const fetchUsers = apiService.fetchUsers.bind(apiService)
