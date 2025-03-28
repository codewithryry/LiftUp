<template>
    <div 
      :class="['selfcare-card', viewMode]"
      @click="$emit('resource-clicked', resource)"
    >
      
      <div class="card-content">
        <div class="card-header">
          <h3>{{ resource.title }}</h3>
          <div class="meta-info">
            <span class="category-badge" v-for="category in resource.categories" :key="category" 
                  :style="{ backgroundColor: getCategoryColor(category) }">
              {{ formatCategory(category) }}
            </span>
            <span class="duration" v-if="resource.duration">
              <i class="far fa-clock"></i> {{ getDurationName(resource.duration) }}
            </span>
          </div>
        </div>
        
        <p class="description">{{ resource.description }}</p>
        
        <div class="card-footer">
          <button 
            class="action-btn"
            @click.stop="addActivity"
            :disabled="isAdding"
          >
            <span v-if="!isAdding">
              <i class="fas fa-plus-circle"></i> Add this Activity
            </span>
            <span v-else>
              <i class="fas fa-check"></i> Added!
            </span>
          </button>
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
      },
      viewMode: {
        type: String,
        default: 'grid',
        validator: value => ['grid', 'list'].includes(value)
      }
    },
    data() {
      return {
        isAdding: false
      }
    },
    methods: {
      toggleSave() {
        this.$emit('save-resource', this.resource.id)
      },
      addActivity() {
        this.isAdding = true
        setTimeout(() => {
          this.$emit('add-activity', this.resource)
          setTimeout(() => {
            this.isAdding = false
          }, 2000)
        }, 500)
      },
      formatCategory(category) {
        const names = {
          mindfulness: 'Mindfulness',
          physical: 'Physical',
          emotional: 'Emotional',
          social: 'Social',
          creative: 'Creative',
          sleep: 'Sleep',
          nutrition: 'Nutrition'
        }
        return names[category] || category
      },
      getCategoryColor(category) {
        const colors = {
          mindfulness: '#A5C4D4',
          physical: '#E3B5A4',
          emotional: '#8E6C88',
          social: '#F4B860',
          creative: '#E87EA1',
          sleep: '#7EC4A5',
          nutrition: '#B5A4E3'
        }
        return colors[category] || '#8E6C88'
      },
      getCategoryIcon(category) {
        const icons = {
          mindfulness: 'fas fa-spa',
          physical: 'fas fa-running',
          emotional: 'fas fa-heart',
          social: 'fas fa-users',
          creative: 'fas fa-paint-brush',
          sleep: 'fas fa-moon',
          nutrition: 'fas fa-apple-alt'
        }
        return icons[category] || 'fas fa-heart'
      },
      getDurationName(duration) {
        const durations = {
          under5: 'Under 5 mins',
          '5to15': '5-15 mins',
          '15to30': '15-30 mins',
          over30: '30+ mins'
        }
        return durations[duration] || duration
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
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
  
  .selfcare-card {
    background: $white;
    border-radius: $border-radius;
    overflow: hidden;
    transition: $transition;
    cursor: pointer;
    box-shadow: $shadow-sm;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: $shadow-lg;
    }
  
    .card-image {
      position: relative;
      height: 160px;
      
      .image-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $white;
        
        i {
          font-size: 3rem;
          opacity: 0.8;
        }
      }
      
      .save-btn {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 36px;
        height: 36px;
        background: rgba($white, 0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
        transition: $transition;
        color: $danger;
        z-index: 2;
        
        &:hover {
          background: $white;
          transform: scale(1.1);
        }
        
        i {
          font-size: 1.1rem;
        }
      }
    }
  
    .card-content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  
    .card-header {
      margin-bottom: 1rem;
      
      h3 {
        font-size: 1.2rem;
        margin-bottom: 0.75rem;
        color: $dark;
        line-height: 1.4;
      }
    }
  
    .meta-info {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      
      .category-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: $white;
      }
      
      .duration {
        font-size: 0.85rem;
        color: $gray;
        
        i {
          margin-right: 0.25rem;
        }
      }
    }
  
    .description {
      color: $gray-dark;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex: 1;
      font-size: 0.95rem;
    }
  
    .card-footer {
      display: flex;
      justify-content: flex-end;
      margin-top: auto;
      
      .action-btn {
        padding: 0.75rem 1.5rem;
        background: $primary;
        color: $white;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: $transition;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.95rem;
        
        &:hover:not(:disabled) {
          background: $primary-dark;
          transform: translateY(-2px);
        }
        
        &[disabled] {
          background: $success;
          cursor: default;
        }
        
        i {
          font-size: 1rem;
        }
      }
    }
  
    /* List view specific styles */
    &.list {
      flex-direction: row;
      
      .card-image {
        flex: 0 0 120px;
        height: auto;
        
        .image-placeholder i {
          font-size: 2rem;
        }
        
        .save-btn {
          width: 30px;
          height: 30px;
          
          i {
            font-size: 1rem;
          }
        }
      }
      
      .card-content {
        padding: 1.25rem;
      }
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .selfcare-card.list {
      flex-direction: column;
      
      .card-image {
        flex: 0 0 140px;
      }
    }
  }
  
  @media (max-width: 480px) {
    .selfcare-card {
      .card-image {
        height: 140px;
      }
      
      .card-content {
        padding: 1.25rem;
      }
      
      .action-btn {
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
      }
    }
  }
  </style>