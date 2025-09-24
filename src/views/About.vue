<template>
  <div class="about-page">
    <div class="hero-section">
      <h1>About This Project</h1>
      <p class="hero-description">
        Learn about the technologies, architecture, and features that make this Vue 3 SPA special.
      </p>
    </div>
    
    <div class="content-sections">
      <section class="tech-stack">
        <h2>🛠️ Technology Stack</h2>
        <div class="tech-grid">
          <div class="tech-item card">
            <div class="tech-icon">⚡</div>
            <h3>Vue 3</h3>
            <p>Progressive JavaScript framework with Composition API</p>
          </div>
          <div class="tech-item card">
            <div class="tech-icon">🗂️</div>
            <h3>Vuex 4</h3>
            <p>State management pattern and library</p>
          </div>
          <div class="tech-item card">
            <div class="tech-icon">🛣️</div>
            <h3>Vue Router 4</h3>
            <p>Client-side routing with navigation guards</p>
          </div>
          <div class="tech-item card">
            <div class="tech-icon">⚡</div>
            <h3>Vite</h3>
            <p>Next generation frontend tooling</p>
          </div>
          <div class="tech-item card">
            <div class="tech-icon">📡</div>
            <h3>Axios</h3>
            <p>HTTP client for API integration</p>
          </div>
          <div class="tech-item card">
            <div class="tech-icon">🎨</div>
            <h3>CSS3</h3>
            <p>Modern styling with custom properties</p>
          </div>
        </div>
      </section>
      
      <section class="features">
        <h2>✨ Key Features</h2>
        <div class="features-list">
          <div class="feature card">
            <h3>🔄 Reactive State Management</h3>
            <p>Vuex store with actions, mutations, and getters for predictable state updates</p>
          </div>
          <div class="feature card">
            <h3>🎭 Component Communication</h3>
            <p>Demonstrates parent-child props/events and sibling state sharing patterns</p>
          </div>
          <div class="feature card">
            <h3>🌙 Dynamic Theming</h3>
            <p>Light/dark mode switching with persistent user preferences</p>
          </div>
          <div class="feature card">
            <h3>📱 Responsive Design</h3>
            <p>Mobile-first approach with flexible layouts and adaptive components</p>
          </div>
          <div class="feature card">
            <h3>🔐 Authentication Flow</h3>
            <p>Login/logout system with form validation and session management</p>
          </div>
          <div class="feature card">
            <h3>⚡ Performance Optimized</h3>
            <p>Code splitting, lazy loading, and optimized build configuration</p>
          </div>
        </div>
      </section>
      
      <section class="architecture">
        <h2>🏗️ Architecture Highlights</h2>
        <div class="architecture-points">
          <div class="point card">
            <h4>Composition API</h4>
            <p>Modern Vue 3 patterns for better code organization and reusability</p>
          </div>
          <div class="point card">
            <h4>Modular CSS</h4>
            <p>Scoped styles with CSS custom properties for maintainable theming</p>
          </div>
          <div class="point card">
            <h4>Error Handling</h4>
            <p>Comprehensive error boundaries and user feedback mechanisms</p>
          </div>
          <div class="point card">
            <h4>TypeScript Ready</h4>
            <p>Props validation and emit declarations for type safety</p>
          </div>
        </div>
      </section>
      
      <section class="demo-info">
        <h2>🎯 Demo Information</h2>
        <div class="demo-card card">
          <h3>How to Use This Demo</h3>
          <ul>
            <li><strong>Home:</strong> Explore component communication examples</li>
            <li><strong>Dashboard:</strong> View user management and API integration</li>
            <li><strong>Profile:</strong> Test authentication (use any email/password)</li>
            <li><strong>Theme Toggle:</strong> Switch between light and dark modes</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
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
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.6;
}

.content-sections {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

section h2 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-2xl);
  text-align: center;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.tech-item {
  text-align: center;
  padding: var(--spacing-xl);
  transition: transform var(--transition-fast);
}

.tech-item:hover {
  transform: translateY(-5px);
}

.tech-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

.tech-item h3 {
  color: var(--color-primary);
  margin: 0 0 var(--spacing-sm) 0;
}

.tech-item p {
  color: var(--color-text-muted);
  margin: 0;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-lg);
}

.feature {
  padding: var(--spacing-lg);
}

.feature h3 {
  color: var(--color-primary);
  margin: 0 0 var(--spacing-sm) 0;
}

.feature p {
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.6;
}

.architecture-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-md);
}

.point {
  padding: var(--spacing-lg);
}

.point h4 {
  color: var(--color-primary);
  margin: 0 0 var(--spacing-sm) 0;
}

.point p {
  color: var(--color-text-muted);
  margin: 0;
}

.demo-card {
  padding: var(--spacing-xl);
  background: var(--color-bg-secondary);
}

.demo-card h3 {
  color: var(--color-primary);
  margin: 0 0 var(--spacing-md) 0;
}

.demo-card ul {
  margin: 0;
  padding-left: var(--spacing-lg);
}

.demo-card li {
  margin-bottom: var(--spacing-sm);
  line-height: 1.6;
}

.demo-card strong {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .tech-grid,
  .features-list,
  .architecture-points {
    grid-template-columns: 1fr;
  }
  
  .hero-section {
    padding: var(--spacing-xl) var(--spacing-md);
  }
  
  .hero-section h1 {
    font-size: var(--font-size-2xl);
  }
}
</style>
