import { createStore } from 'vuex'
import apiService from '../services/api'

// Initial state
const state = {
  // User authentication
  user: {
    loggedIn: false,
    name: 'Guest',
    email: null,
    id: null,
  },
  
  // UI state
  theme: 'light',
  loading: {
    users: false,
    posts: false,
    auth: false,
  },
  
  // Data
  users: [],
  posts: [],
  
  // Error handling
  errors: {
    users: null,
    posts: null,
    auth: null,
  },
}

// Getters
const getters = {
  // User getters
  isLoggedIn: (state) => state.user.loggedIn,
  currentUser: (state) => state.user,
  userName: (state) => state.user.name,
  
  // Theme getters
  currentTheme: (state) => state.theme,
  isDarkTheme: (state) => state.theme === 'dark',
  
  // Loading getters
  isLoading: (state) => (key) => state.loading[key] || false,
  isAnyLoading: (state) => Object.values(state.loading).some(loading => loading),
  
  // Data getters
  allUsers: (state) => state.users,
  getUserById: (state) => (id) => state.users.find(user => user.id === id),
  allPosts: (state) => state.posts,
  getPostsByUserId: (state) => (userId) => state.posts.filter(post => post.userId === userId),
  
  // Error getters
  getError: (state) => (key) => state.errors[key],
  hasError: (state) => (key) => !!state.errors[key],
}

// Mutations
const mutations = {
  // User mutations
  SET_USER_LOGIN(state, userData) {
    state.user = {
      loggedIn: true,
      name: userData.name,
      email: userData.email,
      id: userData.id,
    }
  },
  
  SET_USER_LOGOUT(state) {
    state.user = {
      loggedIn: false,
      name: 'Guest',
      email: null,
      id: null,
    }
  },
  
  // Theme mutations
  SET_THEME(state, theme) {
    state.theme = theme
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme)
  },
  
  TOGGLE_THEME(state) {
    const newTheme = state.theme === 'light' ? 'dark' : 'light'
    state.theme = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
  },
  
  // Loading mutations
  SET_LOADING(state, { key, loading }) {
    state.loading[key] = loading
  },
  
  // Data mutations
  SET_USERS(state, users) {
    state.users = users
  },
  
  ADD_USER(state, user) {
    state.users.push(user)
  },
  
  SET_POSTS(state, posts) {
    state.posts = posts
  },
  
  ADD_POST(state, post) {
    state.posts.unshift(post) // Add to beginning
  },
  
  // Error mutations
  SET_ERROR(state, { key, error }) {
    state.errors[key] = error
  },
  
  CLEAR_ERROR(state, key) {
    state.errors[key] = null
  },
  
  CLEAR_ALL_ERRORS(state) {
    Object.keys(state.errors).forEach(key => {
      state.errors[key] = null
    })
  },
}

// Actions
const actions = {
  // Auth actions
  async login({ commit, dispatch }, { email, password }) {
    commit('SET_LOADING', { key: 'auth', loading: true })
    commit('CLEAR_ERROR', 'auth')
    
    try {
      // Simulate API call - replace with real authentication
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data
      const userData = {
        id: 1,
        name: 'John Doe',
        email: email,
      }
      
      commit('SET_USER_LOGIN', userData)
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userData))
      
      return { success: true }
    } catch (error) {
      commit('SET_ERROR', { key: 'auth', error: error.message })
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', { key: 'auth', loading: false })
    }
  },
  
  logout({ commit }) {
    commit('SET_USER_LOGOUT')
    localStorage.removeItem('user')
  },
  
  // Initialize user from localStorage
  initAuth({ commit }) {
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        commit('SET_USER_LOGIN', userData)
      } catch (error) {
        localStorage.removeItem('user')
      }
    }
  },
  
  // Theme actions
  setTheme({ commit }, theme) {
    commit('SET_THEME', theme)
    localStorage.setItem('theme', theme)
  },
  
  toggleTheme({ commit, state }) {
    commit('TOGGLE_THEME')
    localStorage.setItem('theme', state.theme)
  },
  
  initTheme({ commit }) {
    const theme = localStorage.getItem('theme') || 'light'
    commit('SET_THEME', theme)
  },
  
  // Data actions
  async fetchUsers({ commit }) {
    commit('SET_LOADING', { key: 'users', loading: true })
    commit('CLEAR_ERROR', 'users')
    
    try {
      const result = await apiService.fetchUsers()
      
      if (result.success) {
        commit('SET_USERS', result.data)
      } else {
        commit('SET_ERROR', { key: 'users', error: result.error })
      }
      
      return result
    } catch (error) {
      commit('SET_ERROR', { key: 'users', error: error.message })
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', { key: 'users', loading: false })
    }
  },
  
  async fetchPosts({ commit }, userId = null) {
    commit('SET_LOADING', { key: 'posts', loading: true })
    commit('CLEAR_ERROR', 'posts')
    
    try {
      const result = await apiService.fetchPosts(userId)
      
      if (result.success) {
        commit('SET_POSTS', result.data)
      } else {
        commit('SET_ERROR', { key: 'posts', error: result.error })
      }
      
      return result
    } catch (error) {
      commit('SET_ERROR', { key: 'posts', error: error.message })
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', { key: 'posts', loading: false })
    }
  },
}

export default createStore({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production',
})
