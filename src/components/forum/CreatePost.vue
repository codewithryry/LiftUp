<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Create New Post</h2>
        <button class="close-btn" @click="$emit('close')">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="post-form">
        <div class="form-group">
          <input 
            type="text" 
            v-model="post.title" 
            required
            placeholder="Post title"
            class="modern-input"
          >
        </div>
        
        <div class="form-group">
          <select v-model="post.category" required class="modern-select">
            <option value="" disabled>Select a category</option>
            <option value="support">Seeking Support</option>
            <option value="experience">Sharing Experience</option>
            <option value="question">Question</option>
            <option value="discussion">Discussion</option>
          </select>
        </div>
        
        <div class="form-group">
          <textarea 
            v-model="post.content" 
            required
            placeholder="Share your thoughts..."
            rows="6"
            class="modern-textarea"
          ></textarea>
        </div>
        
        <div class="form-footer">
          <div class="anonymous-toggle">
            <input 
              type="checkbox" 
              id="anonymous" 
              v-model="post.isAnonymous"
              class="toggle-input"
            >
            <label for="anonymous" class="toggle-label">
              <span class="toggle-handle"></span>
              <span class="toggle-text">Post anonymously</span>
            </label>
          </div>
          
          <div class="form-actions">
            <button type="button" @click="$emit('close')" class="btn-secondary">
              Cancel
            </button>
            <button type="submit" class="btn-primary" :disabled="loading">
              <span v-if="!loading">Publish Post</span>
              <div v-else class="spinner"></div>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'

export default {
  data() {
    return {
      post: {
        title: '',
        category: '',
        content: '',
        isAnonymous: true
      },
      loading: false,
      error: null
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      this.error = null
      try {
        const postData = {
          ...this.post,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          commentCount: 0,
          likeCount: 0,
          userId: this.$store.state.user?.uid || 'anonymous',
          author: {
            username: this.post.isAnonymous ? 'Anonymous' : this.$store.state.user?.displayName,
            avatar: this.post.isAnonymous ? '' : this.$store.state.user?.photoURL
          }
        }
        
        const docRef = await addDoc(collection(db, 'posts'), postData)
        this.$emit('post-created', docRef.id)
        this.resetForm()
        this.$emit('close')
      } catch (error) {
        console.error('Error creating post:', error)
        this.error = 'Failed to create post. Please try again.'
      } finally {
        this.loading = false
      }
    },
    resetForm() {
      this.post = {
        title: '',
        category: '',
        content: '',
        isAnonymous: true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  
  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #1a1a1a;
  }
  
  .close-btn {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: #666;
    
    svg {
      width: 24px;
      height: 24px;
    }
    
    &:hover {
      color: #333;
    }
  }
}

.post-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.modern-input, .modern-select, .modern-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
}

.modern-textarea {
  min-height: 150px;
  resize: vertical;
}

.modern-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.anonymous-toggle {
  display: flex;
  align-items: center;
}
.toggle-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.toggle-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.toggle-handle {
  width: 50px;
  height: 28px;
  background: #e0e0e0;
  border-radius: 14px;
  position: relative;
  transition: all 0.3s ease;
  margin-right: 0.75rem;

  &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.toggle-input:checked + .toggle-label .toggle-handle {
  background-color: #6366f1;
}

.toggle-input:checked + .toggle-label .toggle-handle::after {
  transform: translateX(24px);
}

.form-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: #6366f1;
  color: white;
  
  &:hover {
    background: #4f46e5;
  }
  
  &:disabled {
    background: #a5b4fc;
    cursor: not-allowed;
  }
}

.btn-secondary {
  background: white;
  color: #6366f1;
  border: 1px solid #e0e0e0;
  
  &:hover {
    background: #f5f5f5;
  }
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>