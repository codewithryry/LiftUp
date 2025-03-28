<template>
    <div class="self-care-tip">
      <div class="tip-header">
        <h3>{{ tip.title }}</h3>
        <button 
          @click="$emit('save-tip', tip.id)" 
          class="save-btn"
          :aria-label="isSaved ? 'Remove from saved' : 'Save tip'"
        >
          <i :class="isSaved ? 'icon-bookmark-filled' : 'icon-bookmark'"></i>
        </button>
      </div>
      
      <div class="tip-content">
        <p>{{ tip.description }}</p>
      </div>
      
      <div class="tip-categories">
        <span 
          v-for="category in tip.categories" 
          :key="category"
          class="category-tag"
        >
          {{ category }}
        </span>
      </div>
      
      <div class="tip-footer">
        <div class="tip-duration" v-if="tip.duration">
          <i class="icon-clock"></i> {{ tip.duration }} mins
        </div>
        <button 
          v-if="tip.steps && tip.steps.length > 0" 
          @click="showSteps = !showSteps" 
          class="btn-text"
        >
          {{ showSteps ? 'Hide Steps' : 'View Steps' }}
        </button>
      </div>
      
      <div v-if="showSteps && tip.steps" class="tip-steps">
        <ol>
          <li v-for="(step, index) in tip.steps" :key="index">
            {{ step }}
          </li>
        </ol>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tip: {
        type: Object,
        required: true
      },
      isSaved: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showSteps: false
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  .self-care-tip {
    background: white;
    border-radius: 8px;
    padding: 20px;
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
  
  .tip-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
    
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
  
  .tip-content {
    margin-bottom: 15px;
    flex: 1;
    
    p {
      color: $gray;
      line-height: 1.5;
      margin: 0;
    }
  }
  
  .tip-categories {
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
  
  .tip-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .tip-duration {
      font-size: 0.9rem;
      color: $gray;
      
      i {
        margin-right: 5px;
      }
    }
    
    .btn-text {
      background: none;
      border: none;
      color: $primary;
      cursor: pointer;
      font-size: 0.9rem;
      padding: 0;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  .tip-steps {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
    
    ol {
      padding-left: 20px;
      margin: 0;
      color: $gray;
      line-height: 1.6;
      
      li {
        margin-bottom: 8px;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  </style>