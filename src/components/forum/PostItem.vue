<template>
  <div class="post-card">
    <div class="post-header">
      <div class="post-meta">
        <span class="post-category" :class="post.category">{{ categoryLabel }}</span>
        <span class="post-date">{{ formattedDate }}</span>
      </div>
      <h3 class="post-title">{{ post.title }}</h3>
    </div>
    
    <div class="post-content">
      <p>{{ truncatedContent }}</p>
      <button v-if="shouldTruncate" @click="expandPost" class="read-more">
        Read {{ isExpanded ? 'less' : 'more' }}
      </button>
    </div>
    
    <div class="post-footer">
      <div class="post-stats">
        <span class="comments">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ post.commentCount }} comments
        </span>
        <span class="likes">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ post.likeCount }} likes
        </span>
      </div>
      
      <div class="post-actions" v-if="showActions">
        <button @click="editPost" class="btn-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button @click="deletePost" class="btn-icon danger">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 6H5H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Post Detail Modal -->
    <div v-if="isExpanded" class="post-modal-overlay" @click.self="isExpanded = false">
      <div class="post-modal">
        <button class="close-modal" @click="isExpanded = false">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <div class="modal-post-header">
          <div class="author-info">
            <img :src="post.author.avatar || require('@/assets/default-avatar.png')" alt="Author" class="author-avatar">
            <div>
              <h4>{{ post.author.username }}</h4>
              <span class="post-date">{{ formattedDate }}</span>
            </div>
          </div>
          <span class="post-category" :class="post.category">{{ categoryLabel }}</span>
        </div>
        
        <div class="modal-post-content">
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
        </div>
        
        <CommentSection :postId="post.id" :comments="post.comments" />
      </div>
    </div>
  </div>
</template>

<script>
import CommentSection from './CommentSection.vue'

export default {
  components: {
    CommentSection
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    showActions: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      isExpanded: false
    }
  },
  computed: {
    formattedDate() {
      return new Date(this.post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    categoryLabel() {
      const categories = {
        'support': 'Seeking Support',
        'experience': 'Sharing Experience',
        'question': 'Question',
        'discussion': 'Discussion'
      }
      return categories[this.post.category] || this.post.category
    },
    truncatedContent() {
      if (this.isExpanded || this.post.content.length <= this.maxLength) {
        return this.post.content
      }
      return this.post.content.substring(0, this.maxLength) + '...'
    },
    shouldTruncate() {
      return this.post.content.length > this.maxLength
    }
  },
  methods: {
    expandPost() {
      this.isExpanded = !this.isExpanded
    },
    editPost() {
      this.$router.push(`/forum/edit/${this.post.id}`)
    },
    async deletePost() {
      try {
        await this.$store.dispatch('deleteForumPost', this.post.id)
        this.$emit('post-deleted')
        this.$toast.success('Post deleted successfully')
      } catch (error) {
        this.$toast.error('Failed to delete post')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.post-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

.post-header {
  margin-bottom: 1rem;
  
  .post-meta {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
    color: #666;
  }
  
  .post-category {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    margin-right: 0.75rem;
    
    &.support {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }
    
    &.experience {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }
    
    &.question {
      background: rgba(99, 102, 241, 0.1);
      color: #6366f1;
    }
    
    &.discussion {
      background: rgba(31, 41, 55, 0.1);
      color: #1f2937;
    }
  }
  
  .post-title {
    margin: 0;
    color: #1a1a1a;
    font-size: 1.25rem;
    font-weight: 600;
  }
}

.post-content {
  margin-bottom: 1.5rem;
  color: #4b5563;
  line-height: 1.6;
  
  p {
    margin: 0 0 1rem 0;
  }
  
  .read-more {
    background: none;
    border: none;
    color: #6366f1;
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  padding-top: 1rem;
  
  .post-stats {
    display: flex;
    gap: 1.5rem;
    font-size: 0.875rem;
    color: #666;
    
    svg {
      width: 18px;
      height: 18px;
      margin-right: 0.5rem;
      vertical-align: middle;
    }
  }
  
  .post-actions {
    display: flex;
    gap: 0.5rem;
  }
}

.btn-icon {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #666;
  border-radius: 6px;
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    background: #f5f5f5;
  }
  
  &.danger {
    color: #ef4444;
    
    &:hover {
      background: rgba(239, 68, 68, 0.1);
    }
  }
}

/* Post Modal Styles */
.post-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.post-modal {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  position: relative;
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #666;
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  &:hover {
    color: #333;
  }
}

.modal-post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  .author-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .author-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }
    
    h4 {
      margin: 0 0 0.25rem 0;
      font-size: 1.1rem;
    }
    
    .post-date {
      font-size: 0.875rem;
      color: #666;
    }
  }
}

.modal-post-content {
  margin-bottom: 2rem;
  
  h2 {
    margin: 0 0 1.5rem 0;
    font-size: 1.75rem;
    color: #1a1a1a;
  }
  
  p {
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .post-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .post-stats {
    width: 100%;
    justify-content: space-between;
  }
  
  .post-modal {
    padding: 1.5rem;
  }
  
  .modal-post-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>