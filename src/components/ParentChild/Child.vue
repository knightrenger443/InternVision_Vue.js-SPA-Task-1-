<template>
  <div class="child-component card">
    <div class="component-header">
      <h3>Child Component</h3>
      <p class="component-description">
        Receives messages from parent via props and sends messages via events
      </p>
    </div>
    
    <div class="received-message">
      <label>Message from Parent:</label>
      <div class="message-display">
        {{ message || 'No message received' }}
      </div>
    </div>
    
    <div class="response-section">
      <label for="child-response">Your Response:</label>
      <div class="response-controls">
        <input 
          id="child-response"
          v-model="responseMessage"
          placeholder="Type your response..."
          class="input"
          @keyup.enter="sendResponse"
        />
        <button 
          @click="sendResponse" 
          :disabled="!responseMessage.trim()"
          class="btn btn-primary"
        >
          Send to Parent
        </button>
      </div>
    </div>
    
    <div class="quick-responses">
      <label>Quick Responses:</label>
      <div class="quick-response-buttons">
        <button 
          v-for="quickResponse in quickResponses" 
          :key="quickResponse"
          @click="sendQuickResponse(quickResponse)"
          class="btn btn-sm btn-secondary"
        >
          {{ quickResponse }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Child',
  props: {
    message: {
      type: String,
      required: false,
      default: '',
      validator: (value) => {
        return typeof value === 'string'
      }
    }
  },
  emits: {
    'child-event': (message) => {
      return typeof message === 'string' && message.trim().length > 0
    }
  },
  setup(props, { emit }) {
    const responseMessage = ref('')
    const quickResponses = ref([
      'Hello Parent! 👋',
      'Thanks for the message!',
      'Got it! ✅',
      'Awesome! 🚀',
      'Nice to hear from you!'
    ])
    
    const sendResponse = () => {
      if (responseMessage.value.trim()) {
        emit('child-event', responseMessage.value.trim())
        responseMessage.value = ''
      }
    }
    
    const sendQuickResponse = (message) => {
      emit('child-event', message)
    }
    
    return {
      responseMessage,
      quickResponses,
      sendResponse,
      sendQuickResponse
    }
  }
}
</script>

<style scoped>
.child-component {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.component-header {
  margin-bottom: var(--spacing-lg);
}

.component-header h3 {
  margin: 0 0 var(--spacing-sm) 0;
  color: white;
}

.component-description {
  margin: 0;
  opacity: 0.9;
  font-size: var(--font-size-sm);
}

.received-message {
  margin-bottom: var(--spacing-lg);
}

.received-message label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
}

.message-display {
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  border: 2px solid rgba(255, 255, 255, 0.2);
  min-height: 20px;
  font-style: italic;
}

.response-section {
  margin-bottom: var(--spacing-lg);
}

.response-section label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
}

.response-controls {
  display: flex;
  gap: var(--spacing-sm);
}

.response-controls .input {
  flex: 1;
}

.input {
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

.quick-responses label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
}

.quick-response-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-primary);
  font-weight: 500;
}

.btn-primary:hover {
  background: white;
}

@media (max-width: 768px) {
  .response-controls {
    flex-direction: column;
  }
  
  .quick-response-buttons {
    justify-content: center;
  }
}
</style>
