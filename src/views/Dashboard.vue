<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <p class="dashboard-subtitle">Manage users and view analytics</p>
    </div>
    
    <!-- User Management Section -->
    <div class="section">
      <div class="section-header">
        <h2>User Management</h2>
        <div class="section-actions">
          <button 
            @click="loadUsers" 
            :disabled="isLoadingUsers"
            class="btn btn-primary"
          >
            <span v-if="isLoadingUsers" class="loading"></span>
            {{ isLoadingUsers ? 'Loading...' : 'Refresh Users' }}
          </button>
        </div>
      </div>
      
      <!-- Error Display -->
      <div v-if="usersError" class="error-message">
        <span>⚠️ {{ usersError }}</span>
        <button @click="clearUsersError" class="btn btn-sm">Dismiss</button>
      </div>
      
      <!-- Users List -->
      <div v-if="users.length > 0" class="users-grid">
        <div 
          v-for="user in users" 
          :key="user.id" 
          class="user-card card"
        >
          <div class="user-avatar">
            {{ user.name.charAt(0).toUpperCase() }}
          </div>
          <div class="user-info">
            <h3>{{ user.name }}</h3>
            <p class="user-email">{{ user.email }}</p>
            <p class="user-company">{{ user.company?.name }}</p>
          </div>
          <div class="user-actions">
            <button 
              @click="loadUserPosts(user.id)"
              class="btn btn-sm btn-secondary"
            >
              View Posts
            </button>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="!isLoadingUsers" class="empty-state">
        <h3>No Users Found</h3>
        <p>Click "Refresh Users" to load user data.</p>
      </div>
    </div>
    
    <!-- Posts Section -->
    <div v-if="selectedUserId" class="section">
      <div class="section-header">
        <h2>Posts by {{ selectedUser?.name }}</h2>
        <button 
          @click="clearSelectedUser"
          class="btn btn-sm btn-secondary"
        >
          Clear Selection
        </button>
      </div>
      
      <!-- Posts Loading -->
      <div v-if="isLoadingPosts" class="loading-state">
        <div class="loading"></div>
        <span>Loading posts...</span>
      </div>
      
      <!-- Posts Error -->
      <div v-else-if="postsError" class="error-message">
        <span>⚠️ {{ postsError }}</span>
        <button @click="clearPostsError" class="btn btn-sm">Dismiss</button>
      </div>
      
      <!-- Posts List -->
      <div v-else-if="userPosts.length > 0" class="posts-list">
        <div 
          v-for="post in userPosts" 
          :key="post.id"
          class="post-card card"
        >
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Dashboard',
  setup() {
    const store = useStore()
    const selectedUserId = ref(null)
    
    // Computed properties
    const users = computed(() => store.getters.allUsers)
    const userPosts = computed(() => 
      selectedUserId.value 
        ? store.getters.getPostsByUserId(selectedUserId.value)
        : []
    )
    const selectedUser = computed(() => 
      selectedUserId.value 
        ? store.getters.getUserById(selectedUserId.value)
        : null
    )
    
    // Loading states
    const isLoadingUsers = computed(() => store.getters.isLoading('users'))
    const isLoadingPosts = computed(() => store.getters.isLoading('posts'))
    
    // Error states
    const usersError = computed(() => store.getters.getError('users'))
    const postsError = computed(() => store.getters.getError('posts'))
    
    // Methods
    const loadUsers = async () => {
      await store.dispatch('fetchUsers')
    }
    
    const loadUserPosts = async (userId) => {
      selectedUserId.value = userId
      await store.dispatch('fetchPosts', userId)
    }
    
    const clearSelectedUser = () => {
      selectedUserId.value = null
    }
    
    const clearUsersError = () => {
      store.commit('CLEAR_ERROR', 'users')
    }
    
    const clearPostsError = () => {
      store.commit('CLEAR_ERROR', 'posts')
    }
    
    // Load data on mount
    onMounted(() => {
      if (users.value.length === 0) {
        loadUsers()
      }
    })
    
    return {
      users,
      userPosts,
      selectedUser,
      selectedUserId,
      isLoadingUsers,
      isLoadingPosts,
      usersError,
      postsError,
      loadUsers,
      loadUserPosts,
      clearSelectedUser,
      clearUsersError,
      clearPostsError,
    }
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.dashboard-subtitle {
  color: var(--color-text-muted);
  font-size: var(--font-size-lg);
}

.section {
  margin-bottom: var(--spacing-2xl);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-border);
}

.section-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.user-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  transition: transform var(--transition-fast);
}

.user-card:hover {
  transform: translateY(-2px);
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--font-size-lg);
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-info h3 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-base);
}

.user-email, .user-company {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.user-actions {
  flex-shrink: 0;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.post-card {
  padding: var(--spacing-lg);
}

.post-card h3 {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--color-primary);
}

.post-card p {
  margin: 0;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.error-message {
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid var(--color-error);
  color: var(--color-error);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loading-state {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  color: var(--color-text-muted);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--color-text-muted);
}

.empty-state h3 {
  margin-bottom: var(--spacing-sm);
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-xs);
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: stretch;
  }
  
  .users-grid {
    grid-template-columns: 1fr;
  }
  
  .user-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
