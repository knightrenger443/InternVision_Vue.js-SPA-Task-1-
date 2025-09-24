<template>
  <div class="parent-component card">
    <div class="component-header">
      <h2>Parent Component</h2>
      <p class="component-description">
        Demonstrates parent-to-child communication via props and child-to-parent via events
      </p>
    </div>
    
    <div class="message-input">
      <label for="parent-message">Message to Child:</label>
      <input 
        id="parent-message"
        v-model="parentMsg" 
        placeholder="Type a message..."
        class="input"
      />
    </div>
    
    <div class="messages-received">
      <h3>Messages from Child:</h3>
      <div v-if="receivedMessages.length === 0" class="no-messages">
        No messages received yet
      </div>
      <div v-else class="message-list">
        <div 
          v-for="(message, index) in receivedMessages" 
          :key="index"
          class="message-item"
        >
          <span class="message-text">{{ message.text }}</span>
          <span class="message-time">{{ message.time }}</span>
        </div>
      </div>
    </div>
    
    <Child :message="parentMsg" @child-event="onChildEvent" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Child from './Child.vue'

export default {
  name: 'Parent',
  components: { Child },
  setup() {
    const parentMsg = ref('Hello from Parent! 👋')
    const receivedMessages = ref([])
    
    const onChildEvent = (message) => {
      const timestamp = new Date().toLocaleTimeString()
      receivedMessages.value.unshift({
        text: message,
        time: timestamp
      })
      
      // Keep only last 5 messages
      if (receivedMessages.value.length > 5) {
        receivedMessages.value = receivedMessages.value.slice(0, 5)
      }
    }
    
    return {
      parentMsg,
      receivedMessages,
      onChildEvent
    }
  }
}
</script>

<style scoped>
.parent-component {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  margin-bottom: var(--spacing-lg);
}

.component-header {
  margin-bottom: var(--spacing-lg);
}

.component-header h2 {
  margin: 0 0 var(--spacing-sm) 0;
  color: white;
}

.component-description {
  margin: 0;
  opacity: 0.9;
  font-size: var(--font-size-sm);
}

.message-input {
  margin-bottom: var(--spacing-lg);
}

.message-input label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
}

.input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-text);
}

.input:focus {
  outline: none;
  background: white;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}

.messages-received {
  margin-bottom: var(--spacing-lg);
}

.messages-received h3 {
  margin: 0 0 var(--spacing-sm) 0;
  color: white;
}

.no-messages {
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  font-style: italic;
  opacity: 0.8;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.message-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
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
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
