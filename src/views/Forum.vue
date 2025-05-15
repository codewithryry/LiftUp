<template>
  <div class="forum-container">
    <!-- Hero Section with full-width background -->
    <div class="hero-background">
      <section class="forum-hero">
        <div class="hero-content">
          <h1>Online Community</h1>
          <p class="subtitle">Share anonymously. Support openly. No judgments.</p>
          <div class="hero-actions">
            <button 
              @click="showModal = true" 
              class="btn-primary pulse"
              aria-label="Create new post"
            >
             
              Create new post ...
            </button>
          </div>
        </div>
        <div class="hero-pattern"></div>
      </section>
    </div>

    <!-- Main Content -->
    <main class="forum-main">
      <!-- Create Post Modal -->
      <CreatePost 
        v-if="showModal" 
        @close="showModal = false" 
        @post-created="handlePostCreated"
      />

      <!-- Filter Section - Mobile Optimized -->
      <section class="filter-section">
        <div class="filter-container">
          <div class="filter-group">
            <!-- Mobile Filter Dropdown -->
            <div class="mobile-filter-dropdown">
              <select v-model="filter" @change="setQuickFilter(filter)" class="mobile-filter-select">
                <option 
                  v-for="option in filterOptions" 
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
              <i class="fas fa-chevron-down dropdown-icon"></i>
            </div>

            <!-- Desktop Filter Buttons -->
            <div class="filter-options desktop-only">
              <button 
                v-for="option in filterOptions" 
                :key="option.value"
                @click="setQuickFilter(option.value)"
                :class="{ 
                  active: filter === option.value,
                  [option.value]: true 
                }"
                :aria-label="`Filter by ${option.label}`"
              >
                <span class="filter-icon">
                  <i :class="option.icon"></i>
                </span>
                <span class="filter-text">{{ option.label }}</span>
                <span v-if="filter === option.value" class="active-indicator"></span>
              </button>
            </div>

            <div class="view-options">
              <div class="sort-options">
                <label for="sort-select" class="desktop-only">Sort by:</label>
                <select 
                  id="sort-select" 
                  v-model="sortBy" 
                  @change="fetchPosts"
                  class="sort-select"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="most-liked">Most Liked</option>
                  <option value="most-commented">Most Discussed</option>
                </select>
              </div>
              <button 
              class="view-toggle"
              @click="toggleView"
              :aria-label="gridView ? 'Switch to list view' : 'Switch to grid view'"
            >
              <i :class="gridView ? 'fas fa-th-list' : 'fas fa-th-large'"></i>
            </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Posts Content -->
      <section class="posts-content">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading stories...</p>
        </div>

        <!-- Enhanced Error State -->
        <div v-else-if="error" class="error-state">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>We couldn't load the stories</h3>
          <p>{{ error }}</p>
          
          <div class="error-actions">
            <button 
              @click="retryFetch" 
              class="btn-retry"
              :disabled="retrying || retryCount >= maxRetries"
            >
              <i class="fas fa-sync-alt" :class="{ 'fa-spin': retrying }"></i>
              {{ retrying ? 'Retrying...' : 'Try Again' }}
            </button>
            
            <button 
              @click="resetErrorState" 
              class="btn-secondary"
            >
              <i class="fas fa-redo"></i> Reset
            </button>
          </div>
          
          <div v-if="retryCount > 0" class="retry-info">
            <small>Attempt {{ retryCount }} of {{ maxRetries }}</small>
          </div>
          
          <div v-if="retryCount >= maxRetries" class="error-suggestions">
            <p>Still having trouble? Try:</p>
            <ul>
              <li>Checking your internet connection</li>
              <li>Refreshing the page</li>
              <li>Coming back later</li>
            </ul>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredPosts.length === 0" class="empty-state">
          <div class="empty-content">
            <i class="fas fa-comments"></i>
            <h3>It's quiet here...</h3>
            <p>Your voice matters. Share what's on your mind anonymously.</p>
          </div>
        </div>
        
        <div v-else :class="['posts-container', gridView ? 'grid-view' : 'list-view']">
          <PostItem 
            v-for="post in paginatedPosts" 
            :key="post.id" 
            :post="post"
            :gridView="gridView"
            @like-post="likePost(post.id)"
            @toggle-comments="openCommentsModal(post)"
            @post-deleted="fetchPosts"
          />
        </div>
        
        <div v-if="!loading && filteredPosts.length > 0 && totalPages > 1" class="pagination">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="page-btn"
            aria-label="Previous page"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="page-numbers">
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="goToPage(page)"
              :class="{ active: currentPage === page }"
              class="page-number"
            >
              {{ page }}
            </button>
          </div>
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="page-btn"
            aria-label="Next page"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>
    </main>

<!-- Comments Modal -->
<transition name="modal">
      <div v-if="selectedPost" class="modal-overlay" @click.self="closeCommentsModal">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Comments</h3>
            <button class="close-modal" @click="closeCommentsModal" aria-label="Close comments">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-content">
            <CommentSection 
              :post="selectedPost" 
              @comment-added="handleCommentAdded"
              @like-comment="handleLikeComment"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { db } from '@/firebase'
import { collection, query, orderBy, where, getDocs, updateDoc, doc, increment } from 'firebase/firestore'
import CreatePost from '@/components/forum/CreatePost.vue'
import PostItem from '@/components/forum/PostItem.vue'
import CommentSection from '@/components/forum/CommentSection.vue'

export default {
  components: {
    CreatePost,
    PostItem,
    CommentSection
  },
  setup() {
    // Reactive state
    const posts = ref([])
    const loading = ref(true)
    const showModal = ref(false)
    const filter = ref('all')
    const error = ref(null)
    const selectedPost = ref(null)
    const currentPage = ref(1)
    const postsPerPage = ref(10)
    const searchQuery = ref('')
    const sortBy = ref('newest')
    const gridView = ref(false)
    
    // Error handling
    const retrying = ref(false)
    const retryCount = ref(0)
    const maxRetries = 3

    // Filter options
    const filterOptions = [
      { value: 'all', label: 'All Posts', icon: 'fas fa-layer-group' },
      { value: 'popular', label: 'Popular', icon: 'fas fa-fire' },
      { value: 'recent', label: 'Recent', icon: 'fas fa-clock' },
      { value: 'support', label: 'Needs Support', icon: 'fas fa-hands-helping' },
      { value: 'discussion', label: 'Discussions', icon: 'fas fa-comments' }
    ]

    // Computed properties
    const filteredPosts = computed(() => {
      if (!posts.value.length) return []
      
      let result = [...posts.value]
      
      // Apply category filters
      if (filter.value === 'support') {
        result = result.filter(post => post.category === 'support')
      } 
      else if (filter.value === 'discussion') {
        result = result.filter(post => post.category === 'discussion')
      }
      else if (filter.value === 'popular') {
        result = result.sort((a, b) => (b.likes || 0) - (a.likes || 0))
      }
      
      // Apply search
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(post => 
          post.content.toLowerCase().includes(query) || 
          (post.title && post.title.toLowerCase().includes(query))
        )
      }
      
      // Apply sort
      switch (sortBy.value) {
        case 'newest':
          return result.sort((a, b) => b.createdAt - a.createdAt)
        case 'oldest':
          return result.sort((a, b) => a.createdAt - b.createdAt)
        case 'most-liked':
          return result.sort((a, b) => (b.likes || 0) - (a.likes || 0))
        case 'most-commented':
          return result.sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0))
        default:
          return result
      }
    })

    const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage.value))

    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * postsPerPage.value
      const end = start + postsPerPage.value
      return filteredPosts.value.slice(start, end)
    })

    const visiblePages = computed(() => {
      const range = 2
      const start = Math.max(1, currentPage.value - range)
      const end = Math.min(totalPages.value, currentPage.value + range)
      return Array.from({length: end - start + 1}, (_, i) => start + i)
    })

    // Core functions
    const fetchPosts = async () => {
      loading.value = true
      error.value = null
      try {
        let q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
        
        const querySnapshot = await getDocs(q)
        
        posts.value = querySnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            category: data.category || 'general' // Default category
          }
        })

        retryCount.value = 0
      } catch (err) {
        console.error('Error fetching posts:', err)
        error.value = `Failed to load posts. ${err.message}`
        if (retryCount.value < maxRetries) {
          error.value += ` (${maxRetries - retryCount.value} attempts remaining)`
        }
      } finally {
        loading.value = false
        retrying.value = false
      }
    }

    const setQuickFilter = (filterValue) => {
      filter.value = filterValue
      currentPage.value = 1
    }

    const retryFetch = async () => {
      if (retryCount.value >= maxRetries) return
      
      retrying.value = true
      retryCount.value++
      
      try {
        const delay = Math.min(1000 * Math.pow(2, retryCount.value - 1), 8000)
        await new Promise(resolve => setTimeout(resolve, delay))
        await fetchPosts()
      } catch (err) {
        if (retryCount.value >= maxRetries) {
          error.value = "We're having trouble connecting. Please check your network and try again later."
        }
      }
    }

    const resetErrorState = () => {
      error.value = null
      retryCount.value = 0
      loading.value = true
      fetchPosts()
    }

    const openCommentsModal = (post) => {
      selectedPost.value = post
      document.body.style.overflow = 'hidden'
    }

    const closeCommentsModal = () => {
      selectedPost.value = null
      document.body.style.overflow = ''
    }

    const likePost = async (postId) => {
      try {
        const postRef = doc(db, 'posts', postId)
        await updateDoc(postRef, {
          likes: increment(1)
        })
        // Update local state immediately for better UX
        const post = posts.value.find(p => p.id === postId)
        if (post) post.likes = (post.likes || 0) + 1
      } catch (err) {
        console.error('Error liking post:', err)
      }
    }

    const handlePostCreated = () => {
      showModal.value = false
      fetchPosts()
    }

    const handleCommentAdded = () => {
      fetchPosts()
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    const goToPage = (page) => {
      currentPage.value = page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const toggleView = () => {
      gridView.value = !gridView.value
    }

    onMounted(() => {
      fetchPosts()
    })

    return {
      showModal,
      loading,
      error,
      posts,
      filter,
      searchQuery,
      sortBy,
      currentPage,
      postsPerPage,
      selectedPost,
      gridView,
      filterOptions,
      filteredPosts,
      paginatedPosts,
      totalPages,
      visiblePages,
      fetchPosts,
      handlePostCreated,
      setQuickFilter,
      openCommentsModal,
      closeCommentsModal,
      likePost,
      handleCommentAdded,
      prevPage,
      nextPage,
      goToPage,
      retrying,
      retryCount,
      retryFetch,
      resetErrorState,
      toggleView
    }
  }
}
</script>

<style scoped>
/* Full-width hero background */
.hero-background {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50aavw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.forum-container {
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  color: #2c3e50;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.forum-hero {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  color: white;
}

.hero-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
  z-index: 1;
}

.forum-hero h1 {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #fff, #f0f0f0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  color: white;
}
.btn-primary {
  background: white;
  color: #667eea;
  border: none;
  padding: 0.9rem 2rem; /* Increased horizontal padding from 1.5rem to 2rem */
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  min-width: 390px; /* Added minimum width to ensure consistent length */
  text-align: center;
  justify-content: center;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

/* Filter Section */
.filter-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin: -2rem auto 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  position: relative;
  z-index: 2;
  max-width: calc(1200px - 40px);
}

.filter-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/* Mobile Filter Dropdown */
.mobile-filter-dropdown {
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  display: none;
}

.mobile-filter-select {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  appearance: none;
  background-color: white;
  font-size: 1rem;
  color: #4a5568;
  cursor: pointer;
}

.dropdown-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #718096;
}

/* Desktop Filter Buttons */
.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-options button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  border: none;
  background: #f8fafc;
  color: #4a5568;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.filter-options button.active {
  background: #667eea;
  color: white;
  box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);
}

/* View Options */
.view-options {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
}

.view-toggle {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Posts Content */
.posts-content {
  min-height: 500px;
  position: relative;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Enhanced Error State */
.error-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.error-state i {
  font-size: 3rem;
  color: #e53e3e;
  margin-bottom: 1rem;
}

.error-state h3 {
  color: #e53e3e;
  margin-bottom: 0.5rem;
}

.error-state p {
  color: #718096;
  margin-bottom: 1.5rem;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.btn-retry {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
  justify-content: center;
}

.btn-retry:hover:not(:disabled) {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn-retry:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background: #a0aec0;
}

.btn-secondary {
  background: #f8fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-secondary:hover {
  background: #edf2f7;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}

.retry-info {
  margin-top: 1rem;
  color: #a0aec0;
  font-size: 0.9rem;
}

.error-suggestions {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  text-align: left;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.error-suggestions p {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #4a5568;
}

.error-suggestions ul {
  text-align: left;
  padding-left: 1.5rem;
  margin: 0;
  color: #718096;
}

.error-suggestions li {
  margin-bottom: 0.3rem;
}

.fa-spin {
  animation: spin 1s linear infinite;
}

/* Empty State */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.empty-content {
  text-align: center;
  max-width: 400px;
  padding: 2rem;
}

.empty-content i {
  font-size: 3rem;
  color: #a0aec0;
  margin-bottom: 1rem;
}

.empty-content h3 {
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.empty-content p {
  color: #718096;
  margin-bottom: 1.5rem;
}

/* Posts Container */
.posts-container.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  min-height: 500px;
}

.posts-container.list-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 500px;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.page-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-number.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
}

.modal-container {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: fadeIn 0.3s ease-out;
  margin: auto; /* Helps with centering */
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #2d3748;
}

.close-modal {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #718096;
  cursor: pointer;
  transition: color 0.2s;
}

.close-modal:hover {
  color: #2d3748;
}

.modal-content {
  padding: 0;
  overflow-y: auto;
  flex-grow: 1;
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}


/* Mobile Styles */
@media (max-width: 768px) {
  .forum-hero {
    padding: 2rem 1rem;
  }
  
  .forum-hero h1 {
    font-size: 2rem;
  }
  
  .filter-section {
    padding: 1rem;
    margin-top: -1rem;
  }
  
  .desktop-only {
    display: none !important;
  }
  
  .mobile-filter-dropdown {
    display: block;
  }
  
  .filter-group {
    flex-direction: column;
  }
  
  .view-options {
    width: 100%;
    justify-content: space-between;
  }
  
  .sort-options {
    flex-grow: 1;
  }
  
  .sort-select {
    width: 100%;
    padding: 0.75rem 1rem;
  }
  
  .posts-container.grid-view {
    grid-template-columns: 1fr;
  }
  
  .posts-content,
  .loading-state {
    min-height: 400px;
  }
  
  /* Mobile-specific error state */
  .error-state {
    padding: 2rem 1rem;
  }
  
  .error-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .btn-retry,
  .btn-secondary {
    width: 100%;
  }
  
  .error-suggestions {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
  
  /* Mobile-specific filter and sort improvements */
  .mobile-filter-select, .sort-select {
    font-size: 0.95rem;
    padding: 0.8rem 1rem;
  }
  
  .view-toggle {
    width: 44px;
    height: 44px;
  }
  
  .pagination {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .page-btn, .page-number {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }

  /* Mobile modal adjustments */
  .modal-container {
    width: 95%;
    max-height: 85vh;
    border-radius: 12px 12px 0 0;
    position: fixed;
    bottom: 0;
  }
  
  .modal-overlay {
    align-items: flex-end;
  }
}

@media (max-width: 768px) {
  .modal-overlay {
    align-items: center; /* Force center alignment */
    padding: 1rem;
  }
  
  .modal-container {
    max-height: 15vh; /* Slightly smaller to ensure it fits with keyboard */
    margin: 0 auto; /* Center horizontally */
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}


</style>