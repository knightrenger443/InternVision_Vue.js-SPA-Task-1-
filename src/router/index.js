
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Dashboard from '../views/Dashboard.vue'

// Route configurations with meta data
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home - Vue 3 SPA',
      description: 'Welcome to Vue 3 Single Page Application showcasing modern web development',
      requiresAuth: false
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Profile - Vue 3 SPA',
      description: 'User profile and authentication',
      requiresAuth: false // Profile handles its own auth state
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard - Vue 3 SPA',
      description: 'User management and data dashboard',
      requiresAuth: false // Make it accessible for demo purposes
    }
  },
  {
    path: '/about',
    name: 'About',
    // Lazy loaded route
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About - Vue 3 SPA',
      description: 'Learn more about this Vue 3 application',
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Page Not Found - Vue 3 SPA',
      description: 'The requested page could not be found',
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Smooth scroll behavior
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Update document title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // Update meta description
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description)
    }
  }
  
  // Auth guard (commented out for demo - can be enabled for real auth)
  // if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
  //   next({ name: 'Profile' })
  //   return
  // }
  
  next()
})

// After each route change
router.afterEach((to, from) => {
  // Analytics tracking could go here
  console.log(`Navigated from ${from.name} to ${to.name}`)
})

export default router
