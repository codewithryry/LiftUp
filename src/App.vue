<template>
  <div id="app">
    <!-- Loading overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
    
    <template v-else>
      <!-- Emergency Resources Modal -->
      <EmergencyResources v-if="showEmergency" @close="showEmergency = false"/>
      
      <!-- NavBar (conditionally shown based on route meta) -->
      <NavBar 
        v-if="showNavbar && !hideAllNavigation" 
        @show-emergency="showEmergency = true"
      />
      
      <!-- Main Content -->
      <main :class="{'full-height': hideAllNavigation}">
        <router-view/>
      </main>
      
      <!-- Footer (conditionally shown based on route meta) -->
      <Footer v-if="showFooter && !hideAllNavigation"/>
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

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>