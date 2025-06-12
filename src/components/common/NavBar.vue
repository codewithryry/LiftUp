<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <router-link to="/" class="logo">
          <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>
            <path d="M12 2V12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M12 12L20 7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M12 12L4 7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M12 12L12 22" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
          <span class="logo-text">
            <span class="logo-main">LIFTUP</span>
            <span class="logo-badge">Beta</span>
          </span>
        </router-link>
        
        <div class="mobile-menu-toggle" @click="toggleMobileMenu">
          <svg v-if="!mobileMenuOpen" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
                
        <div class="nav-links" :class="{ 'mobile-active': mobileMenuOpen }" ref="navLinks">
          <div class="main-links">
            <router-link to="/resources" class="nav-link" @click="closeMobileMenu">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Resources</span>
            </router-link>
            <router-link to="/self-care" class="nav-link self-care-link" @click="closeMobileMenu">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
                <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Self-Care</span>
              <!-- <span class="self-care-badge">New</span> -->
            </router-link>
            <router-link to="/forum" class="nav-link" @click="closeMobileMenu">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Forum</span>
            </router-link>
            <router-link to="/about" class="nav-link" @click="closeMobileMenu">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>About</span>
            </router-link>
          <router-link to="/emergency/neura" class="nav-link neura-link" @click="closeMobileMenu">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Neura AI</span>
            <span class="neura-badge">AI</span>
          </router-link>
          <router-link to="/emergency" class="nav-link emergency-link" @click="closeMobileMenu">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Emergency</span>
          </router-link>
          </div>
          
          <div class="auth-section">
            <div class="profile-section" v-if="isAuthenticated">
              <router-link to="/profile" class="profile-link" @click="closeMobileMenu">
                <template v-if="!avatarError && userPhotoUrl">
                  <img 
                    :src="userPhotoUrl" 
                    alt="Profile" 
                    class="avatar"
                    @error="handleImageError"
                  >
                </template>
                <div v-else class="avatar initials">
                  {{ userInitials }}
                </div>
                <div class="profile-info">
                  <span class="username">{{ user.username }}</span>
                  <span class="profile-text">View Profile</span>
                </div>
              </router-link>
            </div>
            
            <div class="auth-buttons" v-if="!isAuthenticated">
              <router-link to="/login" class="btn btn-outline" @click="closeMobileMenu">
                <span>Login</span>
              </router-link>
              <router-link to="/register" class="btn btn-primary" @click="closeMobileMenu">
                <span>Register</span>
              </router-link>
            </div>
            
            <button @click="handleLogout" class="logout-btn" v-else>
              <svg class="logout-icon" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="logout-text">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth } from 'firebase/auth'
import { auth } from '@/firebase'

export default {
  data() {
    return {
      mobileMenuOpen: false,
      user: null,
      avatarError: false,
      defaultAvatarUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      isUsingProviderPhoto: false
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.user = {
          uid: user.uid,
          username: user.displayName || user.email?.split('@')[0] || 'User',
          email: user.email,
          avatar: user.photoURL
        }
        this.avatarError = false
      } else {
        this.user = null
      }
    })
  },
  computed: {
    isAuthenticated() {
      return this.user !== null
    },
    userPhotoUrl() {
      const auth = getAuth()
      const user = auth.currentUser
      
      if (user?.providerData?.length) {
        const googleProvider = user.providerData.find(
          provider => provider.providerId === 'google.com'
        )
        if (googleProvider?.photoURL) {
          this.isUsingProviderPhoto = true
          return googleProvider.photoURL.replace(/=s\d+(-c)?$/, '=s400-c')
        }
        
        const providerWithPhoto = user.providerData.find(
          provider => provider.photoURL
        )
        if (providerWithPhoto?.photoURL) {
          this.isUsingProviderPhoto = true
          return providerWithPhoto.photoURL
        }
      }
      
      if (user?.photoURL) {
        this.isUsingProviderPhoto = true
        return user.photoURL
      }
      
      this.isUsingProviderPhoto = false
      return this.user?.avatar || this.defaultAvatarUrl
    },
    userInitials() {
      const name = this.user?.username || 'User'
      return name.match(/\b\w/g)?.join('').toUpperCase().substr(0, 2) || 'US'
    }
  },
  methods: {
    handleImageError() {
      this.avatarError = true
    },
    async handleLogout() {
      try {
        await auth.signOut()
        this.user = null
        this.$router.push('/login')
        this.closeMobileMenu()
      } catch (error) {
        console.error('Logout failed:', error)
        alert('Logout failed. Please try again.')
      }
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : 'auto'
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
      document.body.style.overflow = 'auto'
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
/* NeuraAI Link */
.neura-link {
  color: #3B82F6;
  position: relative;
}

.neura-link .nav-icon {
  color: currentColor;
}

.neura-link:hover {
  color: #2563EB;
  background: rgba(59, 130, 246, 0.05);
}

.neura-link.router-link-exact-active {
  color: #2563EB;
  font-weight: 600;
}

.neura-link.router-link-exact-active::after {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
}

.neura-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #10B981;
  color: white;
  font-size: 0.55rem;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 999px;
  animation: pulse 2s infinite;
}
/* Base Styles */
.navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  position: relative;
}

/* Logo Styles */
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
  display: flex;
  position: relative;
  align-items: center;
}

.logo-main {
  font-size: 1.4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.logo-badge {
  position: absolute;
  top: -4px;
  right: -20px;
  background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
  color: white;
  font-size: 0.55rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
  white-space: nowrap;
  transform: translateX(50%);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  cursor: pointer;
  z-index: 1001;
}

.mobile-menu-toggle svg {
  width: 24px;
  height: 24px;
  color: #2c3e50;
  transition: transform 0.3s ease;
}

.mobile-menu-toggle svg:hover {
  transform: scale(1.1);
}

/* Navigation Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
}

.main-links {
  display: flex;
  gap: 12px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-icon {
  width: 16px;
  height: 16px;
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
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 2px;
  background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
  border-radius: 2px;
}

/* Self-Care Link
.self-care-link {
  position: relative;

}

.self-care-link .nav-icon {
  color: currentColor;
}

.self-care-link:hover {
  color: #DB2777;
  background: rgba(236, 72, 153, 0.05);
}

.self-care-link.router-link-exact-active {
  color: #DB2777;
}

.self-care-link.router-link-exact-active::after {
  background: linear-gradient(135deg, #EC4899 0%, #DB2777 100%);
}

.self-care-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #EC4899;
  color: white;
  font-size: 0.55rem;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 999px;
  animation: pulse 2s infinite;
} */

/* Emergency Link */
.emergency-link {
  color: #EF4444;
  position: relative;
}

.emergency-link .nav-icon {
  color: currentColor;
}

.emergency-link:hover {
  color: #DC2626;
  background: rgba(239, 68, 68, 0.05);
}

.emergency-link.router-link-exact-active {
  color: #DC2626;
  font-weight: 600;
}

.emergency-link.router-link-exact-active::after {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
}

.neura-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #3B82F6;
  color: white;
  font-size: 0.55rem;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 999px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Auth Section */
.auth-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 12px;
  padding-left: 12px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

.profile-section {
  display: flex;
  align-items: center;
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #2c3e50;
  transition: all 0.3s ease;
  padding: 6px 10px;
  border-radius: 6px;
}

.profile-link:hover {
  background: rgba(124, 58, 237, 0.05);
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 1.2;
  color: #1f2937;
}

.profile-text {
  font-weight: 500;
  font-size: 0.75rem;
  color: #6b7280;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(124, 58, 237, 0.2);
}

.avatar.initials {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
  color: white;
  font-weight: bold;
  font-size: 14px;
}

/* Auth Buttons */
.auth-buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.3s ease;
  white-space: nowrap;
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
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(124, 58, 237, 0.2);
}

/* Logout Button */
.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #EF4444;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: auto;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: #EF4444;
}

.logout-icon {
  width: 16px;
  height: 16px;
}

.logout-text {
  font-weight: 600;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .navbar-content {
    height: 56px;
  }

  .mobile-menu-toggle {
    display: block;
  }
  
  .nav-links {
    position: fixed;
    top: 56px;
    left: 0;
    width: 100%;
    height: calc(100vh - 56px);
    background: white;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.3s ease, opacity 0.3s ease;
    overflow-y: auto;
  }
  
  .nav-links.mobile-active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  
  .main-links {
    flex-direction: column;
    width: 100%;
    gap: 4px;
    order: 1;
  }
  
  .auth-section {
    order: 2;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    border-left: none;
    padding-left: 0;
    margin-left: 0;
    padding-top: 12px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    align-items: flex-start;
  }
  
  .profile-section {
    width: 100%;
  }
  
  .profile-link {
    width: 100%;
    padding: 10px;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .username {
    font-size: 0.95rem;
  }
  
  .auth-buttons {
    width: 100%;
    flex-direction: column;
    gap: 10px;
  }
  
  .btn, .logout-btn {
    width: 100%;
    justify-content: center;
    padding: 12px;
  }
  
  .logout-btn {
    background: rgba(239, 68, 68, 0.05);
    border: 1px solid rgba(239, 68, 68, 0.2);
    font-size: 0.95rem;
  }
  
  .logout-icon {
    width: 18px;
    height: 18px;
  }
  
  .logout-text {
    font-size: 0.9rem;
  }
  
  .nav-link {
    width: 100%;
    padding: 10px 12px;
    justify-content: flex-start;
    font-size: 1rem;
  }
  
  .nav-link.router-link-exact-active::after {
    bottom: auto;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 16px;
  }
  
  .self-care-badge, .neura-badge {
    top: -2px;
    right: 0;
    font-size: 0.6rem;
    padding: 2px 4px;
  }

  .logo-icon {
    width: 24px;
    height: 24px;
  }

  .logo-main {
    font-size: 1.2rem;
  }

  .logo-badge {
    font-size: 0.5rem;
    padding: 1px 4px;
    right: -16px;
  }
}

@media (max-width: 480px) {
  .logo-main {
    font-size: 1.1rem;
  }
  
  .logo-badge {
    font-size: 0.45rem;
    padding: 1px 3px;
    right: -14px;
  }
  
  .logout-btn {
    padding: 10px;
  }

  .nav-link {
    font-size: 0.95rem;
  }
}
</style>