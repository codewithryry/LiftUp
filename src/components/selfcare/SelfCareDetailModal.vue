<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="modal-header">
          <div class="category-badges">
            <span 
              v-for="cat in resource.categories" 
              :key="cat"
              class="category-badge"
            >
              {{ getCategoryName(cat) }}
            </span>
          </div>
          <h2>{{ resource.title }}</h2>
          <div class="resource-meta">
            <span class="duration">{{ getDurationName(resource.duration) }}</span>
            <span class="type">{{ getTypeName(resource.type) }}</span>
            <span class="popularity">
              <i class="fas fa-fire"></i>
              {{ resource.popularity }} likes
            </span>
          </div>
        </div>
        
        <div class="modal-body">
          <p class="resource-description">{{ resource.description }}</p>
          
          <div class="action-buttons">
            <button 
              class="save-btn"
              @click="toggleSave"
              :class="{ saved: isSaved }"
            >
              <i :class="isSaved ? 'fas fa-heart' : 'far fa-heart'"></i>
              {{ isSaved ? 'Saved' : 'Save' }}
            </button>
            <button class="close-btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      resource: {
        type: Object,
        required: true
      },
      isSaved: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      closeModal() {
        this.$emit('close')
      },
      toggleSave() {
        this.$emit('save-resource', this.resource.id)
      },
      getCategoryName(id) {
        const categories = {
          mindfulness: 'Mindfulness',
          physical: 'Physical',
          emotional: 'Emotional',
          social: 'Social',
          spiritual: 'Spiritual',
          creative: 'Creative',
          professional: 'Professional'
        }
        return categories[id] || id
      },
      
      getTypeName(id) {
        const types = {
          meditation: 'Meditation',
          exercise: 'Exercise',
          journaling: 'Journaling',
          routine: 'Routine',
          tool: 'Tool',
          article: 'Article',
          challenge: 'Challenge'
        }
        return types[id] || id
      }
    }
  }
  </script>

  
  <style scoped lang="scss">
  // Design System Variables
  $primary: #8E6C88;
  $primary-light: #F0E6EF;
  $primary-dark: #6A4D67;
  $secondary: #E3B5A4;
  $success: #A5C4D4;
  $warning: #F4B860;
  $danger: #E87EA1;
  $dark: #2D2D2A;
  $gray-dark: #5A5A57;
  $gray: #8E8E8B;
  $gray-light: #C5C5C3;
  $gray-extra-light: #F5F5F5;
  $white: #FFFFFF;
  $border-radius: 12px;
  $shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  $shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
  $shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.16);
  $transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
  }
  
  .modal-container {
    position: relative;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    background-color: $white;
    border-radius: $border-radius;
    box-shadow: $shadow-lg;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    padding: 2rem;
  }
  
  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: $gray-extra-light;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: $transition;
    color: $gray-dark;
    
    &:hover {
      background: $gray-light;
      color: $dark;
    }
    
    i {
      font-size: 1.2rem;
    }
  }
  
  .modal-header {
    margin-bottom: 1.5rem;
    
    h2 {
      font-size: 1.75rem;
      margin: 0.5rem 0;
      color: $dark;
      line-height: 1.3;
    }
  }
  
  .resource-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .category-tag {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    color: $white;
    background: $gray;
  }
  
  .resource-meta {
    display: flex;
    gap: 1.5rem;
    color: $gray;
    font-size: 0.95rem;
    margin-top: 0.5rem;
    
    i {
      margin-right: 0.4rem;
    }
  }
  
  .modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem 0;
  }
  
  .resource-image {
    margin-bottom: 1.5rem;
    border-radius: $border-radius;
    overflow: hidden;
    max-height: 300px;
    
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      display: block;
    }
  }
  
  .resource-content {
    h3 {
      font-size: 1.3rem;
      margin: 1.5rem 0 1rem;
      color: $dark;
    }
    
    .resource-description {
      font-size: 1.1rem;
      line-height: 1.6;
      color: $dark;
      margin-bottom: 2rem;
    }
  }
  
  .resource-details {
    .detail-section {
      margin-bottom: 1.5rem;
      
      h4 {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        color: $primary-dark;
      }
      
      p {
        line-height: 1.6;
        margin-bottom: 0.5rem;
      }
      
      ul {
        padding-left: 1.5rem;
        margin: 0.5rem 0;
        
        li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
      }
    }
  }
  
  .modal-footer {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid $gray-extra-light;
  }
  
  .resource-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .save-btn {
    background: $primary;
    color: $white;
    border: none;
    border-radius: $border-radius;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: $transition;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      background: $primary-dark;
    }
    
    &.saved {
      background: $success;
      
      &:hover {
        background: darken($success, 10%);
      }
    }
    
    i {
      font-size: 1rem;
    }
  }
  
  .external-link {
    background: $gray-extra-light;
    color: $dark;
    border: none;
    border-radius: $border-radius;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: $transition;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    
    &:hover {
      background: $gray-light;
    }
    
    i {
      font-size: 1rem;
    }
  }
  
  // Modal Transition
  .modal-enter {
    opacity: 0;
  }
  
  .modal-leave-active {
    opacity: 0;
  }
  
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    .modal-container {
      width: 95%;
      padding: 1.5rem;
    }
    
    .modal-header h2 {
      font-size: 1.5rem;
    }
    
    .resource-meta {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .resource-actions {
      flex-direction: column;
      
      button, a {
        width: 100%;
        justify-content: center;
      }
    }
  }
  
  @media (max-width: 480px) {
    .modal-container {
      padding: 1.25rem;
    }
    
    .modal-header h2 {
      font-size: 1.3rem;
    }
    
    .resource-content {
      h3 {
        font-size: 1.1rem;
      }
      
      .resource-description {
        font-size: 1rem;
      }
    }
  }
  </style>