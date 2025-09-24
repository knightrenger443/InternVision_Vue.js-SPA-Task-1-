<template>
  <div class="app" :class="`theme-${theme}`">
    <nav class="navbar">
      <div class="nav-brand">
        <h2>Vue3 SPA</h2>
      </div>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/profile">Profile</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/about">About</router-link>
      </div>
      <div class="nav-actions">
        <button @click="toggleTheme" class="theme-toggle">
          {{ theme === 'light' ? '🌙' : '☀️' }}
        </button>
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const theme = computed(() => store.getters.currentTheme)
    
    const toggleTheme = () => {
      store.dispatch('toggleTheme')
    }
    
    // Initialize app state on mount
    onMounted(() => {
      store.dispatch('initTheme')
      store.dispatch('initAuth')
    })
    
    return {
      theme,
      toggleTheme
    }
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  transition: all 0.3s ease;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: white;
}

.nav-brand h2 {
  margin: 0;
  font-weight: 600;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-links a.router-link-exact-active {
  background: rgba(255, 255, 255, 0.2);
  font-weight: 600;
}

.theme-toggle {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.main-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Theme Variables */
.theme-light {
  background-color: #f8f9fa;
  color: #333;
}

.theme-dark {
  background-color: #1a1a1a;
  color: #e0e0e0;
}

.theme-dark .navbar {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .main-content {
    padding: 1rem;
  }
}
</style>
