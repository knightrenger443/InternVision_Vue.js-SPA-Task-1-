<template>
  <div class="profile-page">
    <div class="profile-header">
      <h1>User Profile</h1>
      <p class="profile-subtitle">Manage your account and preferences</p>
    </div>
    
    <!-- Logged in state -->
    <div v-if="isLoggedIn" class="profile-content">
      <div class="user-info-card card">
        <div class="user-avatar-large">
          {{ user.name.charAt(0).toUpperCase() }}
        </div>
        <div class="user-details">
          <h2>{{ user.name }}</h2>
          <p class="user-email">{{ user.email }}</p>
          <span class="status-badge status-online">✓ Online</span>
        </div>
        <button @click="handleLogout" class="btn btn-secondary logout-btn">
          Logout
        </button>
      </div>
      
      <div class="profile-sections">
        <div class="section card">
          <h3>Account Settings</h3>
          <div class="settings-list">
            <div class="setting-item">
              <label>Theme Preference:</label>
              <button @click="toggleTheme" class="btn btn-sm">
                {{ currentTheme === 'light' ? '🌙 Switch to Dark' : '☀️ Switch to Light' }}
              </button>
            </div>
            <div class="setting-item">
              <label>Notifications:</label>
              <input type="checkbox" v-model="notifications" /> Enabled
            </div>
          </div>
        </div>
        
        <div class="section card">
          <h3>Recent Activity</h3>
          <div class="activity-list">
            <div class="activity-item">
              <span class="activity-icon">🔑</span>
              <div class="activity-details">
                <p>Logged in successfully</p>
                <span class="activity-time">{{ loginTime }}</span>
              </div>
            </div>
            <div class="activity-item">
              <span class="activity-icon">🎨</span>
              <div class="activity-details">
                <p>Changed theme to {{ currentTheme }}</p>
                <span class="activity-time">Recently</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Login form -->
    <div v-else class="login-section">
      <div class="login-card card">
        <div class="login-header">
          <h2>Welcome Back!</h2>
          <p>Please sign in to your account</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              id="email"
              v-model="loginForm.email"
              type="email"
              placeholder="Enter your email"
              class="input"
              :class="{ 'input-error': emailError }"
              required
            />
            <span v-if="emailError" class="error-text">{{ emailError }}</span>
          </div>
          
          <div class="form-group">
            <label for="password">Password:</label>
            <input 
              id="password"
              v-model="loginForm.password"
              type="password"
              placeholder="Enter your password"
              class="input"
              :class="{ 'input-error': passwordError }"
              required
            />
            <span v-if="passwordError" class="error-text">{{ passwordError }}</span>
          </div>
          
          <div v-if="authError" class="error-message">
            ⚠️ {{ authError }}
          </div>
          
          <button 
            type="submit" 
            :disabled="isAuthLoading || !isFormValid"
            class="btn btn-primary login-btn"
          >
            <span v-if="isAuthLoading" class="loading"></span>
            {{ isAuthLoading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>
        
        <div class="login-footer">
          <p class="demo-note">
            <strong>Demo:</strong> Use any email and password to login
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, reactive, ref, watch } from 'vue'

export default {
  name: 'Profile',
  setup() {
    const store = useStore()
    const notifications = ref(true)
    
    // Computed properties
    const user = computed(() => store.getters.currentUser)
    const isLoggedIn = computed(() => store.getters.isLoggedIn)
    const currentTheme = computed(() => store.getters.currentTheme)
    const isAuthLoading = computed(() => store.getters.isLoading('auth'))
    const authError = computed(() => store.getters.getError('auth'))
    
    // Login form
    const loginForm = reactive({
      email: '',
      password: ''
    })
    
    // Form validation
    const emailError = ref('')
    const passwordError = ref('')
    
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
    
    const isFormValid = computed(() => {
      return validateEmail(loginForm.email) && loginForm.password.length >= 3
    })
    
    const loginTime = computed(() => {
      return new Date().toLocaleString()
    })
    
    // Watch for form changes to clear errors
    watch(() => loginForm.email, (newEmail) => {
      if (emailError.value && validateEmail(newEmail)) {
        emailError.value = ''
      }
    })
    
    watch(() => loginForm.password, (newPassword) => {
      if (passwordError.value && newPassword.length >= 3) {
        passwordError.value = ''
      }
    })
    
    // Methods
    const handleLogin = async () => {
      // Validate form
      emailError.value = ''
      passwordError.value = ''
      
      if (!validateEmail(loginForm.email)) {
        emailError.value = 'Please enter a valid email address'
        return
      }
      
      if (loginForm.password.length < 3) {
        passwordError.value = 'Password must be at least 3 characters'
        return
      }
      
      // Attempt login
      const result = await store.dispatch('login', {
        email: loginForm.email,
        password: loginForm.password
      })
      
      if (result.success) {
        loginForm.email = ''
        loginForm.password = ''
      }
    }
    
    const handleLogout = () => {
      store.dispatch('logout')
    }
    
    const toggleTheme = () => {
      store.dispatch('toggleTheme')
    }
    
    return {
      user,
      isLoggedIn,
      currentTheme,
      isAuthLoading,
      authError,
      loginForm,
      emailError,
      passwordError,
      isFormValid,
      loginTime,
      notifications,
      handleLogin,
      handleLogout,
      toggleTheme
    }
  }
}
</script>

<style scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
}

.profile-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.profile-subtitle {
  color: var(--color-text-muted);
  font-size: var(--font-size-lg);
}

.user-info-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-xl);
}

.user-avatar-large {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--font-size-2xl);
  flex-shrink: 0;
}

.user-details {
  flex: 1;
}

.user-details h2 {
  margin: 0 0 var(--spacing-xs) 0;
}

.user-email {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--color-text-muted);
}

.status-badge {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 500;
}

.status-online {
  background: var(--color-success);
  color: white;
}

.logout-btn {
  flex-shrink: 0;
}

.profile-sections {
  display: grid;
  gap: var(--spacing-lg);
}

.section h3 {
  margin: 0 0 var(--spacing-md) 0;
  color: var(--color-primary);
}

.settings-list, .activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-border);
}

.setting-item:last-child {
  border-bottom: none;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) 0;
}

.activity-icon {
  font-size: var(--font-size-lg);
  flex-shrink: 0;
}

.activity-details p {
  margin: 0 0 var(--spacing-xs) 0;
}

.activity-time {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

/* Login Section */
.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: var(--spacing-2xl);
}

.login-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.login-header h2 {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--color-primary);
}

.login-header p {
  margin: 0;
  color: var(--color-text-muted);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.form-group label {
  font-weight: 500;
  color: var(--color-text);
}

.input {
  padding: var(--spacing-md);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  transition: border-color var(--transition-fast);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.input-error {
  border-color: var(--color-error);
}

.error-text {
  color: var(--color-error);
  font-size: var(--font-size-sm);
}

.error-message {
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid var(--color-error);
  color: var(--color-error);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}

.login-btn {
  padding: var(--spacing-md);
  font-size: var(--font-size-base);
  font-weight: 500;
}

.login-footer {
  margin-top: var(--spacing-lg);
  text-align: center;
}

.demo-note {
  background: var(--color-bg-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}

@media (max-width: 768px) {
  .user-info-card {
    flex-direction: column;
    text-align: center;
  }
  
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
  
  .login-card {
    margin: var(--spacing-md);
  }
}
</style>
