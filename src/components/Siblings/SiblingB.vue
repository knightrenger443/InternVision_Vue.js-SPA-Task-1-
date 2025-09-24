<template>
  <div class="sibling-b card">
    <div class="component-header">
      <h3>👧 Sibling B</h3>
      <p class="component-description">
        I react to changes made by Sibling A and display store state
      </p>
    </div>
    
    <div class="store-state">
      <h4>Current Store State:</h4>
      <div class="state-grid">
        <div class="state-item">
          <label>Theme:</label>
          <span class="state-value theme-value" :class="currentTheme">
            {{ currentTheme }} {{ currentTheme === 'dark' ? '🌙' : '☀️' }}
          </span>
        </div>
        <div class="state-item">
          <label>User Status:</label>
          <span class="state-value" :class="{ 'logged-in': isLoggedIn, 'guest': !isLoggedIn }">
            {{ isLoggedIn ? '✓ Logged In' : '❌ Guest' }}
          </span>
        </div>
        <div class="state-item">
          <label>Username:</label>
          <span class="state-value">{{ userName }}</span>
        </div>
        <div class="state-item">
          <label>Users Loaded:</label>
          <span class="state-value">{{ usersCount }}</span>
        </div>
      </div>
    </div>
    
    <div class="theme-changes">
      <h4>Theme Change History:</h4>
      <div v-if="themeHistory.length === 0" class="no-changes">
        No theme changes detected yet
      </div>
      <div v-else class="changes-list">
        <div 
          v-for="(change, index) in themeHistory" 
          :key="index"
          class="change-item"
        >
          <span class="change-text">
            Changed from {{ change.from }} to {{ change.to }}
          </span>
          <span class="change-time">{{ change.time }}</span>
        </div>
      </div>
    </div>
    
    <div class="reactive-actions">
      <h4>Reactive Actions:</h4>
      <div class="actions">
        <button @click="celebrateTheme" class="btn btn-primary">
          <span class="btn-icon">🎉</span>
          Celebrate Current Theme
        </button>
        <button @click="reactToUser" class="btn btn-secondary">
          <span class="btn-icon">👤</span>
          React to User State
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'SiblingB',
  setup() {
    const store = useStore()
    const themeHistory = ref([])
    
    // Computed properties
    const currentTheme = computed(() => store.getters.currentTheme)
    const isLoggedIn = computed(() => store.getters.isLoggedIn)
    const userName = computed(() => store.getters.userName)
    const usersCount = computed(() => store.getters.allUsers.length)
    
    // Watch for theme changes
    let previousTheme = currentTheme.value
    
    watch(currentTheme, (newTheme) => {
      if (newTheme !== previousTheme) {
        const timestamp = new Date().toLocaleTimeString()
        themeHistory.value.unshift({
          from: previousTheme,
          to: newTheme,
          time: timestamp
        })
        
        // Keep only last 3 changes
        if (themeHistory.value.length > 3) {
          themeHistory.value = themeHistory.value.slice(0, 3)
        }
        
        previousTheme = newTheme
      }
    })
    
    // Methods
    const celebrateTheme = () => {
      const message = `🎉 Current theme is ${currentTheme.value}! Looking great!`
      alert(message)
    }
    
    const reactToUser = () => {
      const message = isLoggedIn.value 
        ? `Hello ${userName.value}! Welcome back! 👋`
        : 'Hello Guest! Please consider logging in. 😊'
      alert(message)
    }
    
    return {
      currentTheme,
      isLoggedIn,
      userName,
      usersCount,
      themeHistory,
      celebrateTheme,
      reactToUser
    }
  }
}
</script>

<style scoped>
.sibling-b {
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  color: white;
  max-width: 500px;
}

.component-header {
  margin-bottom: var(--spacing-lg);
}

.component-header h3 {
  margin: 0 0 var(--spacing-sm) 0;
  color: white;
  font-size: var(--font-size-xl);
}

.component-description {
  margin: 0;
  opacity: 0.9;
  font-size: var(--font-size-sm);
}

.store-state, .theme-changes, .reactive-actions {
  margin-bottom: var(--spacing-lg);
}

.store-state h4, .theme-changes h4, .reactive-actions h4 {
  margin: 0 0 var(--spacing-md) 0;
  color: white;
}

.state-grid {
  display: grid;
  gap: var(--spacing-sm);
}

.state-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
}

.state-item label {
  font-weight: 500;
}

.state-value {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-sm);
  font-weight: 500;
}

.theme-value {
  text-transform: capitalize;
}

.logged-in {
  background: var(--color-success);
  color: white;
}

.guest {
  background: var(--color-warning);
  color: var(--color-text);
}

.no-changes {
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  text-align: center;
  font-style: italic;
  opacity: 0.8;
}

.changes-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.change-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  animation: slideIn 0.3s ease-out;
}

.change-text {
  flex: 1;
}

.change-time {
  font-size: var(--font-size-xs);
  opacity: 0.8;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  transition: all var(--transition-fast);
}

.btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.btn-primary {
  background: rgba(255, 255, 255, 0.9);
  color: #4ecdc4;
}

.btn-primary:hover {
  background: white;
}

.btn-icon {
  font-size: var(--font-size-lg);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .sibling-b {
    max-width: 100%;
  }
  
  .state-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
}
</style>
