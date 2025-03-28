<template>
    <div class="resource-detail-modal">
      <div class="modal-overlay" @click="closeModal"></div>
      <div class="modal-content">
        <button class="close-button" @click="closeModal">×</button>
        <h2>{{ resource.title }}</h2>
        <p>{{ resource.description }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ResourceDetailModal",
    props: {
      resource: {
        type: Object,
        required: true,
      },
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
    },
  };
  </script>
  
  <style scoped>
  .resource-detail-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    position: relative;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  </style>