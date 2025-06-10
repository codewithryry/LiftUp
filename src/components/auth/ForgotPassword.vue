<!-- src/components/PasswordReset.vue -->
<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <router-link to="/" class="logo-link">
          <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M12 22V12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M20 7L12 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M12 12L4 7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
          <span class="logo-text">LIFTUP</span>
        </router-link>
        <h2>Reset Your Password</h2>
        <p class="auth-subtitle">Enter your email to receive a password reset link</p>
      </div>
      
      <form @submit.prevent="handleReset" class="auth-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required
            placeholder="your@email.com"
            :class="{ 'input-error': error }"
          >
        </div>
        
        <button type="submit" class="btn btn-primary" :disabled="loading">
          <span v-if="!loading">Send Reset Link</span>
          <div v-else class="spinner"></div>
        </button>
      </form>
      
      <div class="auth-footer">
        <p>Remember your password? <router-link to="/login" class="auth-link">Login here</router-link></p>
        <p>Don't have an account? <router-link to="/register" class="auth-link">Register</router-link></p>
      </div>
      
      <div v-if="error" class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        {{ error }}
      </div>
      <div v-if="message" class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/firebase'

export default {
  name: 'PasswordReset',
  setup() {
    const router = useRouter()
    const email = ref('')
    const loading = ref(false)
    const error = ref('')
    const message = ref('')

    const handleReset = async () => {
      loading.value = true
      error.value = ''
      message.value = ''

      try {
        await sendPasswordResetEmail(auth, email.value)
        message.value = 'Password reset email sent! Check your inbox.'
        email.value = ''
      } catch (err) {
        console.error('Password reset error:', err)
        switch (err.code) {
          case 'auth/invalid-email':
            error.value = 'Please enter a valid email address'
            break
          case 'auth/user-not-found':
            error.value = 'No account found with this email'
            break
          case 'auth/too-many-requests':
            error.value = 'Too many attempts. Please try again later.'
            break
          default:
            error.value = 'Failed to send reset email. Please try again.'
        }
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      loading,
      error,
      message,
      handleReset
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-image: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c');
  background-size: cover;
  background-position: center;
  position: relative;
}

.auth-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay for readability */
  z-index: 1;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.95); /* Slightly transparent white for contrast */
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 2; /* Ensure card is above overlay */
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin-bottom: 1.5rem;
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: #4f46e5;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  background: linear-gradient(90deg, #4f46e5 0%, #7c73e6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.auth-subtitle {
  color: #6b7280;
  font-size: 0.95rem;
}

.auth-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  background: white; /* Ensure input is fully opaque */
}

input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.input-error {
  border-color: #ef4444;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background-color: #4f46e5;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #4338ca;
}

.btn-primary:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.auth-footer {
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 1.5rem;
}

.auth-footer p {
  margin: 0.5rem 0;
}

.auth-link {
  color: #4f46e5;
  font-weight: 500;
  text-decoration: none;
}

.auth-link:hover {
  text-decoration: underline;
}

.alert {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
}

.alert-icon {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.alert-error {
  background-color: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}

.alert-success {
  background-color: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}
</style>