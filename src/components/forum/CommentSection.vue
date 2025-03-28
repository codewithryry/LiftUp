<template>
  <div class="comment-section">
    <div class="section-header">
      <h3>Comments ({{ comments.length }})</h3>
    </div>
    
    <div v-if="isAuthenticated" class="comment-form">
      <img :src="currentUser.photoURL || require('@/assets/default-avatar.png')" 
           alt="Your avatar" 
           class="user-avatar">
      <div class="form-content">
        <textarea
          v-model="newComment"
          placeholder="Write a comment..."
          rows="2"
          @focus="isExpanded = true"
        ></textarea>
        <div v-if="isExpanded" class="form-actions">
          <button @click="cancelComment" class="btn-text">Cancel</button>
          <button @click="addComment" class="btn-primary" :disabled="!newComment.trim()">
            Comment
          </button>
        </div>
      </div>
    </div>
    
    <div class="comments-list">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <img :src="comment.author.avatar || require('@/assets/default-avatar.png')" 
             alt="Author" 
             class="comment-avatar">
        <div class="comment-content">
          <div class="comment-header">
            <span class="comment-author">{{ comment.author.username }}</span>
            <span class="comment-date">{{ formattedDate(comment.createdAt) }}</span>
          </div>
          <p>{{ comment.content }}</p>
          <div class="comment-actions">
            <button @click="toggleLikeComment(comment.id)" class="btn-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" 
                      :fill="comment.isLiked ? 'currentColor' : 'none'" 
                      stroke="currentColor" 
                      stroke-width="1.5"/>
              </svg>
              <span>{{ comment.likeCount || 0 }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Previous script remains the same
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    cancelComment() {
      this.newComment = ''
      this.isExpanded = false
    },
    async toggleLikeComment(commentId) {
      // Implement like functionality
    },
    // Other methods remain the same
  }
}
</script>

<style scoped lang="scss">
.comment-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #f0f0f0;
}

.comment-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .form-content {
    flex: 1;
    
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      resize: none;
      transition: all 0.2s ease;
      
      &:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 0.5rem;
    }
  }
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment {
  display: flex;
  gap: 1rem;
  
  .comment-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }
  
  .comment-content {
    flex: 1;
    
    .comment-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
      
      .comment-author {
        font-weight: 600;
        color: var(--dark);
      }
      
      .comment-date {
        font-size: 0.8rem;
        color: var(--gray);
      }
    }
    
    p {
      margin: 0;
      color: var(--dark);
      line-height: 1.5;
    }
    
    .comment-actions {
      margin-top: 0.5rem;
      
      .btn-icon {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        background: none;
        border: none;
        padding: 0.25rem 0.5rem;
        color: var(--gray);
        cursor: pointer;
        
        svg {
          width: 16px;
          height: 16px;
        }
        
        &:hover {
          color: var(--primary);
        }
      }
    }
  }
}

.btn-text {
  background: none;
  border: none;
  color: var(--gray);
  cursor: pointer;
  
  &:hover {
    color: var(--dark);
  }
}

@media (max-width: 768px) {
  .comment-form {
    flex-direction: column;
    
    .user-avatar {
      display: none;
    }
  }
}
</style>