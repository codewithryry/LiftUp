<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <router-link to="/" class="logo">
          <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M12 22V12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M20 7L12 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M12 12L4 7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
          <span class="logo-text">LiftUp | <s> Rise Together</s></span>
        </router-link>
        
        <div class="mobile-menu-toggle" @click="toggleMobileMenu">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <div class="nav-links" :class="{ 'mobile-active': mobileMenuOpen }">
          <div class="main-links">
            <router-link to="/resources" class="nav-link">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Resources</span>
            </router-link>
            <router-link to="/self-care" class="nav-link">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
                <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Self-Care</span>
            </router-link>
            <router-link to="/forum" class="nav-link">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Forum</span>
            </router-link>
            <router-link to="/about" class="nav-link">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>About</span>
            </router-link>
          </div>
          
          <div class="auth-section">
            <router-link to="/profile" class="profile-link">
                <img :src="user.avatar" alt="Profile" class="avatar">
                <span>Profile</span>
              </router-link>
            <router-link to="/emergency" class="emergency-btn">
              <svg class="emergency-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Emergency</span>
            </router-link>
            
            <div class="auth-buttons" v-if="!isAuthenticated">
              <router-link to="/login" class="btn btn-outline">
                <span>Login</span>
              </router-link>
              <router-link to="/register" class="btn btn-primary">
                <span>Register</span>
              </router-link>
            </div>
            
            <div class="user-menu" v-else>
             
              <button @click="handleLogout" class="btn btn-outline logout-btn">
                <svg class="logout-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { auth } from '@/firebase'
import defaultAvatar from '@/assets/default-avatar.jpg'

export default {
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
    user() {
      if (this.currentUser) {
        return {
          ...this.currentUser,
          avatar: auth.currentUser?.photoURL || defaultAvatar,
          username: auth.currentUser?.displayName || this.currentUser.username || 'User'
        }
      }
      return { username: '', avatar: defaultAvatar }
    }
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout()
      this.$router.push('/login')
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    }
  },
  watch: {
    $route() {
      this.closeMobileMenu()
    }
  }
}
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 1001;
}

.logo-icon {
  width: 28px;
  height: 28px;
  color: #7C3AED;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.mobile-menu-toggle {
  display: none;
  cursor: pointer;
  z-index: 1001;
}

.mobile-menu-toggle svg {
  width: 24px;
  height: 24px;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: block;
  }
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-150%);
    opacity: 0;
    z-index: 1000;
  }
  
  .nav-links.mobile-active {
    transform: translateY(0);
    opacity: 1;
  }
}

.main-links {
  display: flex;
  gap: 15px;
}

@media (max-width: 768px) {
  .main-links {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-icon {
  width: 18px;
  height: 18px;
  color: currentColor;
  flex-shrink: 0;
}

.nav-link:hover {
  color: #7C3AED;
  background: rgba(124, 58, 237, 0.05);
}

.nav-link.router-link-exact-active {
  color: #7C3AED;
  font-weight: 600;
}

.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
  border-radius: 3px;
}

@media (max-width: 768px) {
  .nav-link.router-link-exact-active::after {
    bottom: auto;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 20px;
  }
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 15px;
  padding-left: 15px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .auth-section {
    flex-direction: column;
    width: 100%;
    gap: 15px;
    border-left: none;
    padding-left: 0;
    margin-left: 0;
    padding-top: 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
}

.emergency-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  text-decoration: none;
}

.emergency-btn:hover {
  background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.emergency-icon {
  width: 16px;
  height: 16px;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

@media (max-width: 768px) {
  .auth-buttons {
    width: 100%;
  }
  
  .auth-buttons .btn {
    flex: 1;
    text-align: center;
  }
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-outline {
  border: 1px solid #7C3AED;
  color: #7C3AED;
  background: transparent;
}

.btn-outline:hover {
  background: rgba(124, 58, 237, 0.1);
}

.btn-primary {
  background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
  color: white;
  border: 1px solid #7C3AED;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #6D28D9 0%, #4C1D95 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 15px;
}

@media (max-width: 768px) {
  .user-menu {
    width: 100%;
    justify-content: space-between;
  }
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #2c3e50;
  transition: all 0.3s ease;
}

.profile-link:hover {
  color: #7C3AED;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(124, 58, 237, 0.2);
}

.username {
  font-weight: 500;
  white-space: nowrap;
}

@media (max-width: 480px) {
  .username {
    display: none;
  }
}

.logout-btn {
  padding: 8px 12px;
}

.logout-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 480px) {
  .logout-btn span {
    display: none;
  }
  
  .logout-icon {
    margin-right: 0;
  }
}
</style>