<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <div class="error-visual">
        <div class="error-number">404</div>
        <div class="error-icon">🔍</div>
      </div>
      
      <div class="error-message">
        <h1>Oops! Page Not Found</h1>
        <p class="error-description">
          The page you're looking for seems to have wandered off into the digital void. 
          Don't worry, even the best explorers sometimes take a wrong turn!
        </p>
      </div>
      
      <div class="error-actions">
        <button @click="goHome" class="btn btn-primary">
          <span class="btn-icon">🏠</span>
          Go Home
        </button>
        <button @click="goBack" class="btn btn-secondary">
          <span class="btn-icon">↶</span>
          Go Back
        </button>
      </div>
      
      <div class="helpful-links">
        <h3>Maybe you're looking for:</h3>
        <div class="links-grid">
          <router-link to="/" class="helpful-link card">
            <span class="link-icon">🏠</span>
            <div class="link-content">
              <h4>Home</h4>
              <p>Component demos and features</p>
            </div>
          </router-link>
          <router-link to="/dashboard" class="helpful-link card">
            <span class="link-icon">📊</span>
            <div class="link-content">
              <h4>Dashboard</h4>
              <p>User management interface</p>
            </div>
          </router-link>
          <router-link to="/profile" class="helpful-link card">
            <span class="link-icon">👤</span>
            <div class="link-content">
              <h4>Profile</h4>
              <p>Authentication and settings</p>
            </div>
          </router-link>
          <router-link to="/about" class="helpful-link card">
            <span class="link-icon">ℹ️</span>
            <div class="link-content">
              <h4>About</h4>
              <p>Project information</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'NotFound',
  setup() {
    const router = useRouter()
    
    const goHome = () => {
      router.push('/')
    }
    
    const goBack = () => {
      if (window.history.length > 1) {
        router.go(-1)
      } else {
        router.push('/')
      }
    }
    
    return {
      goHome,
      goBack
    }
  }
}
</script>

<style scoped>
.not-found-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
}

.not-found-content {
  max-width: 800px;
  text-align: center;
}

.error-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.error-number {
  font-size: 8rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  line-height: 1;
}

.error-icon {
  font-size: 4rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.error-message {
  margin-bottom: var(--spacing-2xl);
}

.error-message h1 {
  color: var(--color-text);
  margin: 0 0 var(--spacing-lg) 0;
  font-size: var(--font-size-3xl);
}

.error-description {
  color: var(--color-text-muted);
  font-size: var(--font-size-lg);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.error-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-bottom: var(--spacing-2xl);
  flex-wrap: wrap;
}

.btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-base);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.btn-icon {
  font-size: var(--font-size-lg);
}

.helpful-links {
  margin-top: var(--spacing-2xl);
}

.helpful-links h3 {
  color: var(--color-text);
  margin: 0 0 var(--spacing-xl) 0;
  font-size: var(--font-size-xl);
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.helpful-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-fast);
  border: 2px solid transparent;
}

.helpful-link:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.link-icon {
  font-size: var(--font-size-2xl);
  flex-shrink: 0;
}

.link-content {
  text-align: left;
  flex: 1;
}

.link-content h4 {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--color-primary);
}

.link-content p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .error-visual {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .error-number {
    font-size: 6rem;
  }
  
  .error-icon {
    font-size: 3rem;
  }
  
  .error-message h1 {
    font-size: var(--font-size-2xl);
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 200px;
  }
  
  .links-grid {
    grid-template-columns: 1fr;
  }
  
  .helpful-link {
    flex-direction: column;
    text-align: center;
  }
  
  .link-content {
    text-align: center;
  }
}
</style>
