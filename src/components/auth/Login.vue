<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <button class="back-button" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
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

        <button type="button" class="btn-social btn-google" @click="handleGoogleLogin">
          <svg class="google-icon" viewBox="0 0 24 24" width="18" height="18">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            <path d="M1 1h22v22H1z" fill="none"/>
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
        error.value = 'Google login failed. Please try again.'
      }
    }

    const goBack = () => {
      router.go(-1)
    }

    return {
      form,
      loading,
      error,
      handleLogin,
      handleGoogleLogin,
      goBack
    }
  }
}
</script>

<style scoped lang="scss">
$primary: #4F46E5;
$dark: #1F2937;
$gray: #6B7280;
$danger: #EF4444;

/* Background image from Unsplash (royalty-free)
 * Source: https://unsplash.com/photos/8XddJx Kikg
 * Author: Andrew Neel
 * Description: A calming mental health-themed image with a serene natural background
 */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  background: url('https://images.unsplash.com/photo-1519681393784-d120267933ba') no-repeat center center fixed;
  background-size: cover;
}

.auth-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 24rem;
  backdrop-filter: blur(10px);
  
  .auth-header {
    margin-bottom: 1.5rem;
    text-align: center;
    position: relative;
    
    .back-button {
      position: absolute;
      left: 0;
      top: 0;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      color: $gray;
      transition: color 0.2s ease;
      
      &:hover {
        color: $primary;
      }
    }
    
    h2 {
      color: $dark;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }
    
    .subtitle {
      color: $gray;
      font-size: 0.875rem;
    }
  }
}

.auth-form {
  .form-group {
    margin-bottom: 1.25rem;
    position: relative;
    
    .input-container {
      position: relative;
    }
    
    .modern-input {
      width: 100%;
      padding: 0.75rem 0.75rem 0.75rem 2.5rem;
      border: none;
      border-radius: 0.75rem;
      font-size: 0.875rem;
      background: rgba(0, 0, 0, 0.03);
      transition: all 0.3s ease;
      
      &:focus {
        background: white;
        box-shadow: 0 0 0 3px rgba($primary, 0.15);
        outline: none;
      }
      
      &:not(:placeholder-shown) + .floating-label,
      &:focus + .floating-label {
        transform: translateY(-1.5rem) scale(0.8);
        background: white;
        padding: 0 0.25rem;
        left: 0.75rem;
        color: $primary;
        font-weight: 500;
      }
    }
    
    .floating-label {
      position: absolute;
      left: 2.5rem;
      top: 0.75rem;
      color: $gray;
      pointer-events: none;
      transition: all 0.3s ease;
      transform-origin: left center;
    }
    
    .input-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: $gray;
      opacity: 0.7;
    }
    
    .forgot-password {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.75rem;
      color: $primary;
      text-align: right;
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        color: darken($primary, 10%);
        text-decoration: underline;
      }
    }
  }
  
  .btn-primary {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 0.75rem;
    background: linear-gradient(90deg, $primary, lighten($primary, 10%));
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
    box-shadow: 0 2px 8px rgba($primary, 0.3);
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba($primary, 0.4);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }
  
  .loading-spinner {
    display: flex;
    gap: 0.25rem;
    
    .spinner-dot {
      width: 0.4rem;
      height: 0.4rem;
      background-color: white;
      border-radius: 50%;
      animation: bounce 1.2s infinite ease-in-out both;
      
      &:nth-child(1) { animation-delay: -0.32s; }
      &:nth-child(2) { animation-delay: -0.16s; }
    }
  }
  
  .divider {
    margin: 1.25rem 0;
    color: $gray;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    
    &::before, &::after {
      content: "";
      flex: 1;
      border-bottom: 1px solid rgba($gray, 0.2);
    }
    
    span {
      padding: 0 0.75rem;
    }
  }
  
  .btn-google {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.75rem;
    background: white;
    color: $dark;
    border: 1px solid rgba($gray, 0.2);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    &:hover {
      transform: translateY(-1px);
      background: rgba(0, 0, 0, 0.02);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
}

.auth-footer {
  margin-top: 1.25rem;
  text-align: center;
  color: $gray;
  font-size: 0.75rem;
  
  .auth-link {
    color: $primary;
    font-weight: 600;
    text-decoration: none;
    
    &:hover {
      color: darken($primary, 10%);
      text-decoration: underline;
    }
  }
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba($danger, 0.1);
  color: $danger;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  box-shadow: 0 2px 8px rgba($danger, 0.15);
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

@media (max-width: 480px) {
  .auth-container {
    padding: 0.5rem;
  }
  
  .auth-card {
    padding: 1.5rem;
    border-radius: 1rem;
    margin: 0.5rem;
    max-width: 100%;
  }
  
  .auth-header h2 {
    font-size: 1.25rem;
  }
  
  .auth-form {
    .form-group {
      margin-bottom: 1rem;
      
      .modern-input {
        padding: 0.75rem 0.75rem 0.75rem 2.25rem;
        font-size: 0.8125rem;
      }
      
      .floating-label {
        left: 2.25rem;
        top: 0.75rem;
      }
      
      .input-icon {
        left: 0.5rem;
      }
    }
    
    .btn-primary, .btn-google {
      padding: 0.625rem;
      font-size: 0.8125rem;
      height: 2.25rem;
    }
  }
}
</style>