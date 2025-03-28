<template>
  <div class="forum-container">
    <!-- Hero Section -->
    <section class="forum-hero">
      <div class="hero-content">
        <h1>Anonymous Support</h1>
        <p class="subtitle">Share anonymously. Support openly. No judgments.</p>
        <div class="hero-actions">
          <button 
            @click="showModal = true" 
            class="btn-primary pulse"
            aria-label="Create new post"
          >
            <i class="fas fa-feather-alt"></i>
            Share Your Story
          </button>
        </div>
        <div class="hero-stats">
          <!-- <div class="search-box">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search posts..." 
              @input="debounceSearch"
            >
          </div> -->
        </div>
      </div>
      <div class="hero-pattern"></div>
    </section>

    <!-- Main Content -->
    <main class="forum-main">
      <!-- Create Post Modal -->
      <CreatePost 
        v-if="showModal" 
        @close="showModal = false" 
        @post-created="handlePostCreated"
      />

      <!-- Filter Section -->
      <section class="filter-section">
        <div class="filter-container">
          <div class="filter-group">
            <div class="filter-options">
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
                <label for="sort-select">Sort by:</label>
                <select id="sort-select" v-model="sortBy" @change="fetchPosts">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="most-liked">Most Liked</option>
                  <option value="most-commented">Most Discussed</option>
                </select>
              </div>
              <button 
                class="view-toggle"
                @click="gridView = !gridView"
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
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading stories...</p>
        </div>
        
        <div v-else-if="error" class="error-state">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>We couldn't load the stories</h3>
          <p>{{ error }}</p>
          <button @click="fetchPosts" class="btn-retry">
            <i class="fas fa-sync-alt"></i> Try Again
          </button>
        </div>
        
        <div v-else-if="filteredPosts.length === 0" class="empty-state">
          <div class="empty-content">
            <i class="fas fa-comments"></i>
            <h3>It's quiet here...</h3>
            <p>Your voice matters. Share what's on your mind anonymously.</p>
            <button @click="showModal = true" class="btn-primary">
              <i class="fas fa-feather-alt"></i> Start the Conversation
            </button>
          </div>
        </div>
        
        <div v-else :class="['posts-container', gridView ? 'grid-view' : 'list-view']">
          <PostItem 
            v-for="post in filteredPosts" 
            :key="post.id" 
            :post="post"
            :gridView="gridView"
            @like-post="likePost(post.id)"
            @toggle-comments="openCommentsModal(post.id)"
            @post-deleted="fetchPosts"
          />
        </div>
        
        <div v-if="filteredPosts.length > 0 && totalPages > 1" class="pagination">
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
            <span v-if="showEllipsis" class="ellipsis">...</span>
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
    <transition name="fade">
      <div v-if="selectedPostId" class="comments-overlay" @click.self="selectedPostId = null">
        <div class="comments-container">
          <button class="close-comments" @click="selectedPostId = null" aria-label="Close comments">
            <i class="fas fa-times"></i>
          </button>
          <CommentSection 
            :postId="selectedPostId" 
            @comment-added="fetchPosts" 
          />
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
    const posts = ref([])
    const loading = ref(false)
    const showModal = ref(false)
    const filter = ref('all')
    const error = ref(null)
    const selectedPostId = ref(null)
    const currentPage = ref(1)
    const postsPerPage = ref(10)
    const totalPosts = ref(0)
    const totalLikes = ref(0)
    const searchQuery = ref('')
    const sortBy = ref('newest')
    const gridView = ref(true)
    const debounceTimer = ref(null)

    const filterOptions = [
      { value: 'all', label: 'All Posts', icon: 'fas fa-layer-group' },
      { value: 'popular', label: 'Popular', icon: 'fas fa-fire' },
      { value: 'recent', label: 'Recent', icon: 'fas fa-clock' },
      { value: 'support', label: 'Needs Support', icon: 'fas fa-hands-helping' },
      { value: 'discussion', label: 'Discussions', icon: 'fas fa-comments' }
    ]

    const filteredPosts = computed(() => {
      let filtered = posts.value
      return filtered
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredPosts.value.length / postsPerPage.value)
    })

    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * postsPerPage.value
      const end = start + postsPerPage.value
      return filteredPosts.value.slice(start, end)
    })

    const fetchPosts = async () => {
      loading.value = true
      error.value = null
      try {
        let q = collection(db, 'posts')
        switch (filter.value) {
          case 'recent':
            q = query(q, orderBy('createdAt', 'desc'))
            break
          case 'popular':
            q = query(q, orderBy('likes', 'desc'))
            break
          case 'support':
            q = query(q, where('category', '==', 'support'), orderBy('createdAt', 'desc'))
            break
          case 'discussion':
            q = query(q, where('category', '==', 'discussion'), orderBy('createdAt', 'desc'))
            break
          default:
            q = query(q, orderBy('createdAt', 'desc'))
        }
        const querySnapshot = await getDocs(q)
        posts.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        }))
      } catch (err) {
        console.error('Error fetching posts:', err)
        error.value = 'Failed to load forum posts. Please try again.'
      } finally {
        loading.value = false
      }
    }

    const setQuickFilter = (filterValue) => {
      filter.value = filterValue
      currentPage.value = 1
      fetchPosts()
    }

    const openCommentsModal = (postId) => {
      selectedPostId.value = postId
    }

    const likePost = async (postId) => {
      try {
        const postRef = doc(db, 'posts', postId)
        await updateDoc(postRef, {
          likes: increment(1)
        })
        fetchPosts()
      } catch (err) {
        console.error('Error liking post:', err)
      }
    }

    const handlePostCreated = () => {
      showModal.value = false
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
      totalPosts,
      totalLikes,
      selectedPostId,
      gridView,
      filterOptions,
      debounceTimer,
      filteredPosts: paginatedPosts,
      totalPages,
      fetchPosts,
      handlePostCreated,
      setQuickFilter,
      openCommentsModal,
      likePost,
      prevPage,
      nextPage
    }
  }
}
</script>


























<style scoped>
/* Previous styles remain the same, add these new styles */

.view-options {
  display: flex;
  align-items: center;
  gap: 1rem;
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

.view-toggle:hover {
  background: #f8fafc;
  border-color: #cbd5e0;
  color: #667eea;
}

.view-toggle.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

/* Grid and List view styles */
.posts-container {
  margin-bottom: 2rem;
}

.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.list-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .view-options {
    width: 100%;
    justify-content: space-between;
  }
  
  .grid-view {
    grid-template-columns: 1fr;
  }
}
</style>

<style scoped>
/* Base Styles */
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  padding: 3rem 2rem;
  margin-bottom: 2rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
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
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.hero-actions {
  margin-bottom: 2rem;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  background: rgba(255,255,255,0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(5px);
}

/* Filter Section */
.filter-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.filter-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.search-box {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}

.search-box i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

.search-box input {
  width: 100%;
  padding: 12px 20px 12px 45px;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
}

.search-box input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

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

.filter-options button:hover {
  background: #edf2f7;
  transform: translateY(-1px);
}

.filter-options button.active {
  background: #667eea;
  color: white;
  box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);
}

.filter-options button.active .filter-icon {
  color: white;
}

.filter-icon {
  color: #718096;
  transition: color 0.2s ease;
}

.active-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: white;
  border-radius: 3px 3px 0 0;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-options label {
  font-size: 0.9rem;
  color: #4a5568;
}

.sort-options select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
}

/* Posts Grid */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
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

/* Error State */
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e0;
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

.page-number:hover {
  background: #f8fafc;
}

.page-number.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.ellipsis {
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
}

/* Comments Modal */
.comments-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

.comments-container {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  animation: slideUp 0.3s ease;
}

.close-comments {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #718096;
  cursor: pointer;
  z-index: 10;
  transition: color 0.2s ease;
}

.close-comments:hover {
  color: #e53e3e;
}

/* Buttons */
.btn-primary {
  background: linear-gradient(to right, #667eea, #764ba2);
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
  box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-retry {
  background: #f8fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-retry:hover {
  background: #edf2f7;
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); }
  100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .forum-hero h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .filter-group {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-options {
    justify-content: center;
  }
  
  .sort-options {
    justify-content: center;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>

