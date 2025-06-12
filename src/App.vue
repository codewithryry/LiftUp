<template>
  <div id="app">
    <!-- Loading overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <img src="/img/logo.png" alt="Loading..." class="loading-logo" />
    </div>
    
    <template v-else>
      <!-- Emergency Resources Modal -->
      <EmergencyResources v-if="showEmergency" @close="showEmergency = false" />
      
      <!-- NavBar (only shown after loading and based on route meta) -->
      <NavBar 
        v-if="!isLoading && showNavbar && !hideAllNavigation" 
        @show-emergency="showEmergency = true"
      />
      
      <!-- Main Content -->
      <main :class="{'full-height': hideAllNavigation}">
        <router-view />
      </main>
      
      <!-- Footer (only shown after loading and based on route meta) -->
      <Footer 
        v-if="!isLoading && showFooter && !hideAllNavigation" 
      />
    </template>
  </div>
</template>


<script>
import NavBar from '@/components/common/NavBar.vue'
import Footer from '@/components/common/Footer.vue'
import EmergencyResources from '@/components/common/EmergencyResources.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
    EmergencyResources
  },
  data() {
    return {
      showEmergency: false,
      isLoading: true
    }
  },
  computed: {
    // Show footer unless explicitly set to false in route meta
    showFooter() {
      return this.$route.meta?.showFooter !== false
    },
    // Show navbar unless explicitly set to false in route meta
    showNavbar() {
      return this.$route.meta?.showNavbar !== false
    },
    // Hide both navbar and footer (for full-page views like NeuraAI)
    hideAllNavigation() {
      return this.$route.meta?.hideAllNavigation === true
    }
  },
  watch: {
    // Watch for route changes to update title
    $route(to) {
      document.title = to.meta?.title || 'LiftUp - Mental Health Support'
    }
  },
  mounted() {
    // Simulate loading (replace with actual loading logic if needed)
    setTimeout(() => {
      this.isLoading = false
    }, 500)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Open Sans', sans-serif;
  background-color: #f8f9fa;
  
  > main {
    flex: 1 0 auto;
    
    &.full-height {
      height: 100vh;
      overflow: hidden;
    }
  }
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-logo {
  width: 150px;
  height: 150px;
  animation: pulse 1.5s ease-in-out infinite;
}


@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>