<template>
  <div class="comment-section">
    <div class="section-header">
      <h3>Comments ({{ comments.length }})</h3>
      <p class="anonymous-notice">
        <i class="fas fa-user-secret"></i> All comments are posted anonymously
      </p>
    </div>
    
    <!-- Comment Form -->
    <div class="comment-form">
      <div class="anonymous-avatar">
        <i class="fas fa-user-secret"></i>
      </div>
      <div class="form-content">
        <textarea
          v-model="newComment"
          placeholder="Share your thoughts anonymously..."
          rows="3"
          @focus="isExpanded = true"
          aria-label="Write anonymous comment"
        ></textarea>
        <div v-if="isExpanded" class="form-actions">
          <button 
            @click="cancelComment" 
            class="btn-text"
            aria-label="Cancel comment"
          >
            Cancel
          </button>
          <button 
            @click="addComment" 
            class="btn-primary" 
            :disabled="!newComment.trim() || isSubmitting"
            aria-label="Post anonymous comment"
          >
            <span v-if="!isSubmitting">Post Anonymously</span>
            <span v-else>Posting...</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Comments List -->
    <div class="comments-list">
      <!-- Loading State -->
      <div v-if="loadingComments" class="loading-state">
        <div class="spinner"></div>
        <p>Loading comments...</p>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="comments.length === 0" class="empty-state">
        <i class="fas fa-comment-slash"></i>
        <h4>No comments yet</h4>
        <p>Be the first to share your thoughts</p>
      </div>
      
      <!-- Comments -->
      <div v-else>
        <div 
          v-for="comment in comments" 
          :key="comment.id" 
          class="comment"
        >
          <div class="anonymous-avatar">
            <i class="fas fa-user-secret"></i>
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <span class="comment-author">Anonymous</span>
              <span class="comment-date">{{ formattedDate(comment.createdAt) }}</span>
            </div>
            <p class="comment-text">{{ comment.content }}</p>
            <div class="comment-actions">
              <button 
                @click="toggleLike(comment.id)" 
                class="btn-icon like-btn"
                :class="{ liked: comment.isLiked }"
                aria-label="Like comment"
              >
                <i class="far fa-heart"></i>
              </button>
              <button 
                v-if="showReportButton"
                @click="reportComment(comment.id)"
                class="btn-icon report-btn"
                aria-label="Report comment"
              >
                <i class="far fa-flag"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { db } from '@/firebase'
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  doc,
  updateDoc,
  increment
} from 'firebase/firestore'

export default {
  props: {
    postId: {
      type: String,
      required: true
    },
    showReportButton: {
      type: Boolean,
      default: true
    }
  },

  setup(props, { emit }) {
    const newComment = ref('')
    const isExpanded = ref(false)
    const isSubmitting = ref(false)
    const comments = ref([])
    const loadingComments = ref(true)
    const unsubscribe = ref(null)

    const formattedDate = (date) => {
      if (!date) return ''
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    }

    const addComment = async () => {
      if (!newComment.value.trim() || isSubmitting.value) return

      isSubmitting.value = true
      
      try {
        await addDoc(collection(db, 'posts', props.postId, 'comments'), {
          content: newComment.value.trim(),
          createdAt: serverTimestamp(),
          userId: 'anonymous', // Or use actual user ID if not anonymous
          userName: 'Anonymous',
          likeCount: 0,
          reported: false
        })
        
        newComment.value = ''
        isExpanded.value = false
        emit('comment-added')
      } catch (error) {
        console.error("Error adding comment:", error)
        alert("Failed to add comment. Please try again.")
      } finally {
        isSubmitting.value = false
      }
    }

    const toggleLike = async (commentId) => {
      try {
        const commentRef = doc(db, 'posts', props.postId, 'comments', commentId)
        await updateDoc(commentRef, {
          likeCount: increment(1)
        })
      } catch (error) {
        console.error("Error liking comment:", error)
      }
    }

    const reportComment = async (commentId) => {
      if (confirm("Report this comment as inappropriate?")) {
        try {
          const commentRef = doc(db, 'posts', props.postId, 'comments', commentId)
          await updateDoc(commentRef, {
            reported: true
          })
          alert("Thank you for your report. We'll review this comment.")
        } catch (error) {
          console.error("Error reporting comment:", error)
        }
      }
    }

    const fetchComments = () => {
      loadingComments.value = true
      const q = query(
        collection(db, 'posts', props.postId, 'comments'),
        orderBy('createdAt', 'desc')
      )

      unsubscribe.value = onSnapshot(q, (snapshot) => {
        comments.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        }))
        loadingComments.value = false
      }, (error) => {
        console.error("Error fetching comments:", error)
        loadingComments.value = false
      })
    }

    onMounted(() => {
      fetchComments()
    })

    onUnmounted(() => {
      if (unsubscribe.value) {
        unsubscribe.value()
      }
    })

    return {
      newComment,
      isExpanded,
      isSubmitting,
      comments,
      loadingComments,
      addComment,
      toggleLike,
      reportComment,
      formattedDate
    }
  }
}
</script>

<style scoped>
.comment-section {
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #2d3748;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.anonymous-notice {
  font-size: 0.85rem;
  color: #718096;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.anonymous-notice i {
  font-size: 1rem;
}

/* Comment Form */
.comment-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.anonymous-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718096;
  flex-shrink: 0;
}

.anonymous-avatar i {
  font-size: 1.25rem;
}

.form-content {
  flex: 1;
}

textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  resize: none;
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  min-height: 80px;
}

textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.btn-text {
  background: none;
  border: none;
  color: #718096;
  font-weight: 500;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 6px;
}

.btn-text:hover {
  background-color: #f8fafc;
}

.btn-primary {
  background-color: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  background-color: #5a67d8;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Comments List */
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment {
  display: flex;
  gap: 1rem;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.comment-author {
  font-weight: 600;
  color: #4a5568;
}

.comment-date {
  font-size: 0.8rem;
  color: #718096;
}

.comment-text {
  margin: 0;
  line-height: 1.5;
  color: #4a5568;
}

.comment-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.btn-icon {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.btn-icon:hover {
  background-color: #f8fafc;
}

.btn-icon i {
  font-size: 0.9rem;
}

.like-btn.liked {
  color: #e53e3e;
}

.report-btn:hover {
  color: #e53e3e;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #718096;
}

.loading-state .spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.loading-state p {
  margin: 0;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #a0aec0;
}

.empty-state i {
  font-size: 2rem;
  margin-bottom: 1rem;
  opacity: 0.7;
}

.empty-state h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.empty-state p {
  margin: 0;
  font-size: 0.95rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .comment-form {
    flex-direction: column;
  }
  
  .anonymous-avatar {
    display: none;
  }
  
  .form-actions {
    justify-content: space-between;
  }
  
  .btn-text, .btn-primary {
    padding: 0.6rem 1rem;
    flex: 1;
  }
}
</style>