<template>
    <div class="resource-card">
      <div class="resource-image" :style="{ backgroundImage: `url(${resource.image})` }">
        <div class="resource-type">{{ resource.type }}</div>
      </div>
      
      <div class="resource-content">
        <div class="resource-header">
          <h3>{{ resource.title }}</h3>
          <button 
            @click="$emit('save-resource', resource.id)" 
            class="save-btn"
            :aria-label="isSaved ? 'Remove from saved' : 'Save resource'"
          >
            <i :class="isSaved ? 'icon-bookmark-filled' : 'icon-bookmark'"></i>
          </button>
        </div>
        
        <p class="resource-description">{{ resource.description }}</p>
        
        <div class="resource-categories">
          <span 
            v-for="category in resource.categories" 
            :key="category"
            class="category-tag"
          >
            {{ category }}
          </span>
        </div>
        
        <div class="resource-footer">
          <a :href="resource.url" target="_blank" rel="noopener" class="btn-outline">
            View Resource
          </a>
          <span class="resource-duration" v-if="resource.duration">
            <i class="icon-clock"></i> {{ resource.duration }}
          </span>
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
    }
  }
  </script>
  
  <style scoped lang="scss">
  .resource-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s, box-shadow 0.3s;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
  }
  
  .resource-image {
    height: 150px;
    background-size: cover;
    background-position: center;
    position: relative;
    
    .resource-type {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(black, 0.7);
      color: white;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 0.8rem;
      text-transform: capitalize;
    }
  }
  
  .resource-content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .resource-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
    
    h3 {
      margin: 0;
      color: $dark;
      font-size: 1.1rem;
      flex: 1;
    }
    
    .save-btn {
      background: none;
      border: none;
      color: $gray;
      cursor: pointer;
      font-size: 1.2rem;
      padding: 0;
      margin-left: 10px;
      
      &:hover {
        color: $primary;
      }
      
      .icon-bookmark-filled {
        color: $primary;
      }
    }
  }
  
  .resource-description {
    color: $gray;
    line-height: 1.5;
    margin-bottom: 15px;
    flex: 1;
  }
  
  .resource-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 15px;
    
    .category-tag {
      background: #f0f0f0;
      color: $gray;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
    }
  }
  
  .resource-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    
    .btn-outline {
      padding: 8px 15px;
      font-size: 0.9rem;
    }
    
    .resource-duration {
      font-size: 0.9rem;
      color: $gray;
      
      i {
        margin-right: 5px;
      }
    }
  }
  </style>