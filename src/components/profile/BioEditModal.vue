<template>
    <div class="bio-edit-modal">
      <h3>Edit Bio</h3>
      <textarea v-model="bio"></textarea>
      <button @click="$emit('close')">Cancel</button>
      <button @click="saveBio">Save</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['currentBio'],
    data() {
      return {
        bio: this.currentBio || ''
      }
    },
    methods: {
      saveBio() {
        this.$emit('bio-updated', this.bio)
      }
    }
  }
  </script>