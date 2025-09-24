<template>
  <div class="home-page">
    <div class="hero-section">
      <h1>Welcome to Vue 3 SPA</h1>
      <p class="hero-description">
        A modern single-page application demonstrating Vue 3 features, 
        component communication, state management, and responsive design.
      </p>
      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-number">{{ componentCount }}</span>
          <span class="stat-label">Components</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ featureCount }}</span>
          <span class="stat-label">Features</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ currentTheme }}</span>
          <span class="stat-label">Theme</span>
        </div>
      </div>
    </div>
    
    <div class="demo-sections">
      <div class="section">
        <div class="section-header">
          <h2>👨‍👩‍👧 Parent-Child Communication</h2>
          <p>Demonstrates how parent and child components communicate using props and events.</p>
        </div>
        <Parent />
      </div>
      
      <div class="section">
        <div class="section-header">
          <h2>🤝 Sibling Communication</h2>
          <p>Shows how sibling components communicate through shared state (Vuex store).</p>
        </div>
        <div class="siblings-container">
          <SiblingA />
          <SiblingB />
        </div>
      </div>
      
      <div class="section">
        <div class="section-header">
          <h2>✨ Features Overview</h2>
          <p>Key features and technologies used in this application.</p>
        </div>
        <div class="features-grid">
          <div class="feature-card card">
            <div class="feature-icon">⚡</div>
            <h3>Vue 3 Composition API</h3>
            <p>Modern reactive composition using the latest Vue 3 features</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">🗂️</div>
            <h3>Vuex State Management</h3>
            <p>Centralized state management with actions, mutations, and getters</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">🛣️</div>
            <h3>Vue Router</h3>
            <p>Client-side routing for seamless navigation</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">🎨</div>
            <h3>Responsive Design</h3>
            <p>Mobile-first design with CSS custom properties</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">🌙</div>
            <h3>Theme Switching</h3>
            <p>Dynamic light/dark theme with persistent preferences</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">📡</div>
            <h3>API Integration</h3>
            <p>HTTP client with interceptors and error handling</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Parent from '../components/ParentChild/Parent.vue'
import SiblingA from '../components/Siblings/SiblingA.vue'
import SiblingB from '../components/Siblings/SiblingB.vue'

export default {
  name: 'Home',
  components: { Parent, SiblingA, SiblingB },
  setup() {
    const store = useStore()
    
    const currentTheme = computed(() => store.getters.currentTheme)
    const componentCount = 12
    const featureCount = 6
    
    return {
      currentTheme,
      componentCount,
      featureCount
    }
  }
}
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  padding: var(--spacing-2xl) var(--spacing-md);
  margin-bottom: var(--spacing-2xl);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: white;
  border-radius: var(--radius-lg);
}

.hero-section h1 {
  font-size: var(--font-size-3xl);
  margin: 0 0 var(--spacing-lg) 0;
  color: white;
}

.hero-description {
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto var(--spacing-xl) auto;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.stat-number {
  font-size: var(--font-size-2xl);
  font-weight: 600;
}

.stat-label {
  font-size: var(--font-size-sm);
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.demo-sections {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.section {
  margin-bottom: var(--spacing-2xl);
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.section-header h2 {
  color: var(--color-primary);
  margin: 0 0 var(--spacing-md) 0;
  font-size: var(--font-size-2xl);
}

.section-header p {
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
  max-width: 600px;
  margin: 0 auto;
}

.siblings-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-lg);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.feature-card {
  text-align: center;
  padding: var(--spacing-xl);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  display: block;
}

.feature-card h3 {
  color: var(--color-primary);
  margin: 0 0 var(--spacing-sm) 0;
  font-size: var(--font-size-lg);
}

.feature-card p {
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .hero-stats {
    gap: var(--spacing-lg);
  }
  
  .siblings-container {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  .hero-section {
    padding: var(--spacing-xl) var(--spacing-md);
  }
  
  .hero-section h1 {
    font-size: var(--font-size-2xl);
  }
}
</style>
