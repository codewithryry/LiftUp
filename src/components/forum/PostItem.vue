<template>
  <div class="post-card" :class="{ 'expanded': isExpanded, 'has-comments': showComments }">
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
        <button 
          @click="toggleComments" 
          class="comment-btn"
          :class="{ active: showComments }"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Comment
        </button>
        
        <button 
          class="like-btn" 
          :class="{ liked: false }"
          disabled
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Like
        </button>

        <button @click="sharePost" class="share-btn">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.59 13.51L15.42 17.49" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.41 6.51L8.59 10.49" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Share
        </button>
      </div>
    </div>
    
    <!-- Comments Section -->
    <div v-if="showComments" class="comments-section">
      <CommentSection 
        :postId="post.id" 
        @comment-added="handleCommentAdded"
      />
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
            <div>
              <h4>{{ post.author?.username || 'Unknown Author' }}</h4>
              <span class="post-date">{{ formattedDate }}</span>
            </div>
          </div>
          <span class="post-category" :class="post.category">{{ categoryLabel }}</span>
        </div>
        
        <div class="modal-post-content">
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
        </div>
        
        <CommentSection 
          :postId="post.id" 
          @comment-added="handleCommentAdded"
        />
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
      required: true,
      validator: (value) => {
        return value.id && value.title && value.content
      }
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
      isExpanded: false,
      showComments: false
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
    toggleComments() {
      this.showComments = !this.showComments
    },
    handleCommentAdded() {
      // No longer tracking comment count
    },
    sharePost() {
      if (navigator.share) {
        navigator.share({
          title: this.post.title,
          text: this.truncatedContent,
          url: `${window.location.origin}/forum/post/${this.post.id}`
        }).catch(err => {
          console.log('Error sharing:', err);
          this.copyToClipboard();
        });
      } else {
        this.copyToClipboard();
      }
    },
    copyToClipboard() {
      const el = document.createElement('textarea');
      el.value = `${window.location.origin}/forum/post/${this.post.id}`;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.$toast.success('Link copied to clipboard!');
    },
    editPost() {
      this.$router.push(`/forum/edit/${this.post.id}`)
    },
    async deletePost() {
      if (!confirm('Are you sure you want to delete this post?')) return
      
      try {
        await this.$store.dispatch('deleteForumPost', this.post.id)
        this.$emit('post-deleted')
        this.$toast.success('Post deleted successfully')
      } catch (error) {
        console.error('Error deleting post:', error)
        this.$toast.error(error.message || 'Failed to delete post')
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
  display: flex;
  flex-direction: column;
  min-height: 200px;
  height: auto;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &.expanded {
    min-height: 300px;
  }

  &.has-comments {
    min-height: 400px;
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
    justify-content: space-between;
    width: 100%;
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
  flex-grow: 1;
  margin-bottom: 1.5rem;
  color: #4b5563;
  line-height: 1.6;
  overflow: hidden;
  transition: all 0.3s ease;
  
  p {
    margin: 0 0 1rem 0;
    transition: all 0.3s ease;
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
    gap: 1rem;
    
    .comment-btn, .like-btn, .share-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: none;
      border: none;
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      color: #666;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      border-radius: 6px;
      
      svg {
        width: 18px;
        height: 18px;
      }
      
      &:hover {
        background: #f5f5f5;
      }
    }
    
    .comment-btn.active {
      color: #6366f1;
      background: rgba(99, 102, 241, 0.1);
    }
    
    .like-btn {
      cursor: default;
      opacity: 0.7;
      
      &:hover {
        background: none;
      }
    }
    
    .share-btn:hover {
      color: #10b981;
      background: rgba(16, 185, 129, 0.1);
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

.comments-section {
  flex-grow: 1;
  margin-top: 1.5rem;
  border-top: 1px solid #f0f0f0;
  padding-top: 1.5rem;
  transition: all 0.3s ease;
  max-height: 0;
  overflow: hidden;
  
  .post-card.has-comments & {
    max-height: 1000px;
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
    
    h4 {
      margin: 0 0 0.25rem 0;
      font-size: 1.1rem;
    }
    
    .post-date {
      font-size: 0.875rem;
      text-align: right;
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

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .post-card {
    min-height: 180px;
    
    &.expanded {
      min-height: 280px;
    }
    
    &.has-comments {
      min-height: 350px;
    }
  }
  
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