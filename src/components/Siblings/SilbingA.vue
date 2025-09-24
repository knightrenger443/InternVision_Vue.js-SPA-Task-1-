<template>
  <div class="sibling-a card">
    <div class="component-header">
      <h3>👶 Sibling A</h3>
      <p class="component-description">
        I can change the global theme and send messages through the store
      </p>
    </div>
    
    <div class="current-status">
      <div class="status-item">
        <label>Current Theme:</label>
        <span class="theme-display" :class="currentTheme">
          {{ currentTheme }} {{ currentTheme === 'dark' ? '🌙' : '☀️' }}
        </span>
      </div>
      <div class="status-item">
        <label>Messages Sent:</label>
        <span class="message-count">{{ messageCount }}</span>
      </div>
    </div>
    
    <div class="actions">
      <button @click="toggleTheme" class="btn btn-primary">
        <span class="btn-icon">{{ currentTheme === 'light' ? '🌙' : '☀️' }}</span>
        Toggle Theme
      </button>
      
      <button @click="sendNotification" class="btn btn-secondary">
        <span class="btn-icon">📢</span>
        Send Notification
      </button>
      
      <button @click="sendRandomMessage" class="btn btn-success">
        <span class="btn-icon">🎲</span>
        Random Message
      </button>
    </div>
    
    <div class="message-history">
      <h4>Message History:</h4>
      <div v-if="sentMessages.length === 0" class="no-messages">
        No messages sent yet
      </div>
      <div v-else class="messages-list">
        <div 
          v-for="(message, index) in sentMessages" 
          :key="index"
          class="message-item"
        >
          <span class="message-text">{{ message.text }}</span>
          <span class="message-time">{{ message.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'SiblingA',
  setup() {
    const store = useStore()
    const messageCount = ref(0)
    const sentMessages = ref([])
    
    const randomMessages = [
      'Hello from Sibling A! 👋',
      'Theme changed successfully! ✨',
      'Vuex store is working great! 🚀',
      'Sibling communication active! 📡',
      'State management rocks! 🎤',
      'Vue 3 is amazing! ❤️'
    ]
    
    const currentTheme = computed(() => store.getters.currentTheme)
    
    const addMessage = (text) => {
      const timestamp = new Date().toLocaleTimeString()
      sentMessages.value.unshift({
        text,
        time: timestamp
      })
      messageCount.value++
      
      // Keep only last 5 messages
      if (sentMessages.value.length > 5) {
        sentMessages.value = sentMessages.value.slice(0, 5)
      }
    }
    
    const toggleTheme = () => {
      store.dispatch('toggleTheme')
      addMessage(`Changed theme to ${store.getters.currentTheme}`)
    }
    
    const sendNotification = () => {
      addMessage('Sent notification to Sibling B')
      // You could add a custom event or notification system here
    }
    
    const sendRandomMessage = () => {
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)]
      addMessage(randomMessage)
    }
    
    return {
      currentTheme,
      messageCount,
      sentMessages,
      toggleTheme,
      sendNotification,
      sendRandomMessage
    }
  }
}
</script>

<style scoped>
.sibling-a {
  background: linear-gradient(135deg, #ff9a56 0%, #ffad56 100%);
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

.current-status {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-item label {
  font-weight: 500;
}

.theme-display {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-sm);
  font-weight: 500;
  text-transform: capitalize;
}

.message-count {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
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
  color: #ff9a56;
}

.btn-primary:hover {
  background: white;
}

.btn-icon {
  font-size: var(--font-size-lg);
}

.message-history {
  margin-top: var(--spacing-lg);
}

.message-history h4 {
  margin: 0 0 var(--spacing-md) 0;
  color: white;
}

.no-messages {
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  text-align: center;
  font-style: italic;
  opacity: 0.8;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.message-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  animation: slideIn 0.3s ease-out;
}

.message-text {
  flex: 1;
}

.message-time {
  font-size: var(--font-size-xs);
  opacity: 0.8;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .sibling-a {
    max-width: 100%;
  }
  
  .status-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
}
</style>
