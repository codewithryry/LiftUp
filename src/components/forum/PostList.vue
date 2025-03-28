<template>
  <div class="post-list-container">
    <div v-if="posts.length === 0" class="empty-state">
      <div class="empty-content">
        <i class="fas fa-comment-slash"></i>
        <h3>No posts found</h3>
        <p>Be the first to share your thoughts with the community</p>
        <button @click="$emit('create-post')" class="btn-primary">
          <i class="fas fa-plus"></i> Create Your First Post
        </button>
      </div>
    </div>
    
    <div v-else class="post-list">
      <PostItem 
        v-for="post in posts" 
        :key="post.id" 
        :post="post"
        :show-actions="showActions"
        @post-deleted="$emit('post-deleted')"
        @like-post="$emit('like-post', post.id)"
        @toggle-comments="$emit('toggle-comments', post.id)"
      />
    </div>
  </div>
</template>

<script>
import PostItem from './PostItem.vue'

export default {
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array,
      required: true,
      default: () => []
    },
    showActions: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="scss">
$primary: #6366f1;
$primary-light: #a5b4fc;
$primary-dark: #4f46e5;
$secondary: #E3B5A4;
$success: #10b981;
$warning: #f59e0b;
$danger: #ef4444;
$dark: #1f2937;
$gray-dark: #4b5563;
$gray: #6b7280;
$gray-light: #e5e7eb;
$gray-extra-light: #f9fafb;
$white: #ffffff;
$border-radius: 12px;
$shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
$shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
$shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.16);
$transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);


.post-list-container {
  width: 100%;
}

.empty-state {
  background: $white;
  border-radius: $border-radius;
  padding: 4rem 2rem;
  text-align: center;
  width: 100%;
  box-shadow: $shadow-sm;
  
  .empty-content {
    max-width: 500px;
    margin: 0 auto;
    
    i {
      font-size: 3rem;
      color: $gray-light;
      margin-bottom: 1.5rem;
    }
    
    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
      color: $dark;
    }
    
    p {
      color: $gray;
      margin-bottom: 2rem;
      line-height: 1.6;
      font-size: 1.1rem;
    }
  }
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  background: $white;
  border-radius: $border-radius;
  padding: 1.5rem;
  box-shadow: $shadow-sm;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.75rem;
  background: $primary;
  color: $white;
  border: none;
  border-radius: $border-radius;
  font-weight: 600;
  cursor: pointer;
  transition: $transition;
  box-shadow: $shadow-sm;
  gap: 0.75rem;
  font-size: 1rem;
  
  &:hover {
    background: $primary-dark;
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  i {
    font-size: 0.9rem;
  }
}
</style>