<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2>Welcome back</h2>
        <p class="subtitle">Login to access your account</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <div class="input-container">
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required
              placeholder=" "
              class="modern-input"
            >
            <label for="email" class="floating-label">Email</label>
            <div class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <div class="input-container">
            <input 
              type="password" 
              id="password" 
              v-model="form.password" 
              required
              placeholder=" "
              class="modern-input"
            >
            <label for="password" class="floating-label">Password</label>
            <div class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
          <router-link to="/forgot-password" class="forgot-password">
            Forgot password?
          </router-link>
        </div>
        
        <button type="submit" class="btn-primary" :disabled="loading">
          <span v-if="!loading">Continue</span>
          <div v-else class="loading-spinner">
            <div class="spinner-dot"></div>
            <div class="spinner-dot"></div>
            <div class="spinner-dot"></div>
          </div>
        </button>

        <div class="divider">
          <span>or</span>
        </div>

        <button type="button" class="btn-google" @click="handleGoogleLogin">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          Continue with Google
        </button>
      </form>
      
      <div class="auth-footer">
        <p>Don't have an account? <router-link to="/register" class="auth-link">Sign up</router-link></p>
      </div>
      
      <transition name="fade">
        <div v-if="error" class="error-message">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{{ error }}</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const form = ref({
      email: '',
      password: ''
    })
    const loading = ref(false)
    const error = ref('')

    const handleLogin = async () => {
      loading.value = true
      error.value = ''

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          form.value.email,
          form.value.password
        )

        store.commit('SET_USER', {
          uid: userCredential.user.uid,
          email: userCredential.user.email
        })
        store.commit('SET_TOKEN', userCredential.user.accessToken)

        router.push('/')
      } catch (err) {
        console.error('Login error:', err)
        switch (err.code) {
          case 'auth/invalid-email':
            error.value = 'Invalid email address'
            break
          case 'auth/user-not-found':
            error.value = 'No account found with this email'
            break
          case 'auth/wrong-password':
            error.value = 'Incorrect password'
            break
          case 'auth/too-many-requests':
            error.value = 'Too many attempts. Try again later.'
            break
          default:
            error.value = 'Login failed. Please try again.'
        }
      } finally {
        loading.value = false
      }
    }

    const handleGoogleLogin = async () => {
      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        
        store.commit('SET_USER', {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL
        })
        store.commit('SET_TOKEN', result.user.accessToken)
        
        router.push('/')
      } catch (error) {
        console.error('Google login error:', error)
      }
    }

    return {
      form,
      loading,
      error,
      handleLogin,
      handleGoogleLogin
    }
  }
}
</script>

<style scoped lang="scss">

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1.5rem;
  background-color: #f9fafb;
}

.auth-card {
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 28rem;
  transition: all 0.3s ease;
  
  .auth-header {
    margin-bottom: 2rem;
    text-align: center;
    
    h2 {
      color: $dark;
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    .subtitle {
      color: $gray;
      font-size: 1rem;
    }
  }
}

.auth-form {
  .form-group {
    margin-bottom: 1.5rem;
    position: relative;
    
    .input-container {
      position: relative;
    }
    
    .modern-input {
      width: 100%;
      padding: 1rem 1rem 1rem 2.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: all 0.2s ease;
      background-color: #f9fafb;
      
      &:focus {
        border-color: $primary;
        outline: none;
        box-shadow: 0 0 0 3px rgba($primary, 0.1);
        background-color: white;
      }
      
      &:not(:placeholder-shown) + .floating-label,
      &:focus + .floating-label {
        transform: translateY(-1.25rem) scale(0.85);
        background-color: white;
        padding: 0 0.25rem;
        left: 2.5rem;
        color: $primary;
      }
    }
    
    .floating-label {
      position: absolute;
      left: 2.75rem;
      top: 1rem;
      color: $gray;
      pointer-events: none;
      transition: all 0.2s ease;
      transform-origin: left center;
    }
    
    .input-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: $gray;
    }
    
    .forgot-password {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: $primary;
      text-align: right;
      text-decoration: none;
      transition: color 0.2s ease;
      
      &:hover {
        color: darken($primary, 10%);
      }
    }
  }
  
  .btn-primary {
    width: 100%;
    padding: 0.875rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    background-color: $primary;
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    
    &:hover {
      background-color: darken($primary, 5%);
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
  
  .loading-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    
    .spinner-dot {
      width: 0.5rem;
      height: 0.5rem;
      background-color: white;
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out both;
      
      &:nth-child(1) {
        animation-delay: -0.32s;
      }
      
      &:nth-child(2) {
        animation-delay: -0.16s;
      }
    }
  }
  
  .divider {
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
    color: $gray;
    
    &::before, &::after {
      content: "";
      flex: 1;
      border-bottom: 1px solid #e5e7eb;
    }
    
    span {
      padding: 0 1rem;
      font-size: 0.875rem;
    }
  }
  
  .btn-google {
    width: 100%;
    padding: 0.875rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    background-color: white;
    color: $dark;
    border: 1px solid #e5e7eb;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      background-color: #f9fafb;
      border-color: #d1d5db;
    }
  }
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
  color: $gray;
  font-size: 0.875rem;
  
  .auth-link {
    color: $primary;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: darken($primary, 10%);
    }
  }
}

.error-message {
  margin-top: 1.5rem;
  padding: 0.875rem;
  background: rgba($danger, 0.05);
  color: $danger;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba($danger, 0.1);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes bounce {
  0%, 80%, 100% { 
    transform: translateY(0);
  }
  40% {
    transform: translateY(-0.5rem);
  }
}

@media (max-width: 640px) {
  .auth-card {
    padding: 1.5rem;
    border-radius: 0.75rem;
  }
  
  .auth-header h2 {
    font-size: 1.5rem;
  }
}
</style>