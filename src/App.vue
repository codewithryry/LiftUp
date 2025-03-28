<template>
  <div id="app">
    <EmergencyResources v-if="showEmergency" @close="showEmergency = false"/>
    <NavBar @show-emergency="showEmergency = true"/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue'
import Footer from '@/components/common/Footer.vue'
import EmergencyResources from '@/components/common/EmergencyResources.vue'


export default {
  components: {
    NavBar,
    Footer,
    EmergencyResources
  },
  data() {
    return {
      showEmergency: false
    }
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
}
</style>