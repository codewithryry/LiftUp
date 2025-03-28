<template>
  <div class="self-care-app">
    <div class="self-care-hero">
      <div class="hero-content">
        <h1>Self-Care Resources</h1>
        <p class="subtitle">Curated tools and practices to nourish your mind, body, and soul</p>
        
        <div class="search-container">
          <div class="search-bar">
            <i class="fas fa-search"></i>
            <input 
              type="text" 
              v-model="filters.search" 
              placeholder="Search self-care practices, articles, tools..."
              @input="handleSearch"
            />
            <button v-if="filters.search" @click="clearSearch" class="clear-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="quick-filters">
            <button 
              v-for="category in popularCategories" 
              :key="category.id"
              @click="setQuickFilter(category.id)"
              :class="{ active: filters.category === category.id }"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="main-container">
      <aside class="sidebar-filters">
        <div class="filter-section">
          <h3>Filter Resources</h3>
          
          <div class="filter-group">
            <h4>Self-Care Categories</h4>
            <div class="filter-options">
              <label 
                v-for="category in categories" 
                :key="category.id"
                :class="{ active: filters.category === category.id }"
              >
                <input 
                  type="radio" 
                  name="category" 
                  :value="category.id" 
                  v-model="filters.category"
                  @change="currentPage = 1"
                >
                <span>{{ category.name }}</span>
              </label>
            </div>
          </div>
          
          <div class="filter-group">
            <h4>Practice Type</h4>
            <div class="filter-options">
              <label 
                v-for="type in types" 
                :key="type.id"
                :class="{ active: filters.type === type.id }"
              >
                <input 
                  type="radio" 
                  name="type" 
                  :value="type.id" 
                  v-model="filters.type"
                  @change="currentPage = 1"
                >
                <span>{{ type.name }}</span>
              </label>
            </div>
          </div>

          <div class="filter-group">
            <h4>Time Required</h4>
            <div class="filter-options">
              <label 
                v-for="duration in durations" 
                :key="duration.id"
                :class="{ active: filters.duration === duration.id }"
              >
                <input 
                  type="radio" 
                  name="duration" 
                  :value="duration.id" 
                  v-model="filters.duration"
                  @change="currentPage = 1"
                >
                <span>{{ duration.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </aside>

      <main class="resources-content">
        <div class="content-header">
          <div class="results-info">
            <h2 v-if="filters.category !== 'all'">{{ getCategoryName(filters.category) }}</h2>
            <p class="results-count">
              {{ filteredResources.length }} {{ filteredResources.length === 1 ? 'practice' : 'practices' }} found
            </p>
          </div>
          
          <div class="sort-controls">
            <div class="sort-select">
              <label for="sort-by">Sort by:</label>
              <select 
                id="sort-by" 
                v-model="sortBy" 
                @change="sortResources"
              >
                <option value="relevance">Most Relevant</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="time-asc">Quickest First</option>
                <option value="time-desc">Longest First</option>
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

        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading self-care resources...</p>
        </div>

        <div v-else>
          <div v-if="filteredResources.length > 0" :class="['resources-display', { 'grid-view': gridView, 'list-view': !gridView }]">
            <SelfCareResource 
              v-for="resource in paginatedResources" 
              :key="resource.id"
              :resource="resource"
              :is-saved="isResourceSaved(resource.id)"
              :view-mode="gridView ? 'grid' : 'list'"
              @save-resource="toggleSavedResource"
              @resource-clicked="viewResourceDetail"
            />
          </div>

          <div v-else class="empty-state">
            <div class="empty-content">
              <i class="fas fa-heart"></i>
              <h3>No self-care practices match your search</h3>
              <p>Try adjusting your filters or search term to find what you need.</p>
              <button @click="resetFilters" class="btn-reset">
                <i class="fas fa-sync-alt"></i> Reset all filters
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredResources.length > itemsPerPage" class="pagination">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="page-btn"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <span class="page-info">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="page-btn"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </main>
    </div>

    <SelfCareDetailModal 
      v-if="selectedResource"
      :resource="selectedResource"
      :is-saved="isResourceSaved(selectedResource.id)"
      @close="selectedResource = null"
      @save-resource="toggleSavedResource"
    />
  </div>
</template>

<script>
import SelfCareResource from '@/components/selfcare/SelfCareResource.vue'
import SelfCareDetailModal from '@/components/selfcare/SelfCareDetailModal.vue'
import { fetchSelfCareResources } from '@/services/selfcare.js'

export default {
  components: {
    SelfCareResource,
    SelfCareDetailModal
  },
  data() {
    return {
      resources: [],
      loading: true,
      filters: {
        category: 'all',
        type: 'all',
        duration: 'all',
        search: ''
      },
      categories: [
        { id: 'all', name: 'All Categories' },
        { id: 'mindfulness', name: 'Mindfulness' },
        { id: 'physical', name: 'Physical Health' },
        { id: 'emotional', name: 'Emotional Wellbeing' },
        { id: 'social', name: 'Social Connection' },
        { id: 'spiritual', name: 'Spiritual' },
        { id: 'creative', name: 'Creative Expression' },
        { id: 'professional', name: 'Professional' }
      ],
      types: [
        { id: 'all', name: 'All Types' },
        { id: 'meditation', name: 'Meditation' },
        { id: 'exercise', name: 'Exercise' },
        { id: 'journaling', name: 'Journaling' },
        { id: 'routine', name: 'Routine' },
        { id: 'tool', name: 'Tool' },
        { id: 'article', name: 'Article' },
        { id: 'challenge', name: 'Challenge' }
      ],
      durations: [
        { id: 'all', name: 'Any Duration' },
        { id: 'under5', name: 'Under 5 mins' },
        { id: '5to15', name: '5-15 mins' },
        { id: '15to30', name: '15-30 mins' },
        { id: 'over30', name: '30+ mins' }
      ],
      savedResources: JSON.parse(localStorage.getItem('savedSelfCareResources')) || [],
      sortBy: 'relevance',
      currentPage: 1,
      itemsPerPage: 12,
      selectedResource: null,
      searchTimeout: null,
      gridView: true
    }
  },
  computed: {
    popularCategories() {
      return [
        { id: 'mindfulness', name: 'Mindfulness' },
        { id: 'physical', name: 'Physical' },
        { id: 'emotional', name: 'Emotional' },
        { id: 'quick', name: 'Quick Practices' }
      ]
    },
    
    filteredResources() {
      let filtered = this.resources.filter(resource => {
        const matchesCategory = this.filters.category === 'all' || 
          resource.categories.includes(this.filters.category)
        const matchesType = this.filters.type === 'all' || 
          resource.type === this.filters.type
        const matchesSearch = this.filters.search === '' || 
          resource.title.toLowerCase().includes(this.filters.search.toLowerCase()) || 
          resource.description.toLowerCase().includes(this.filters.search.toLowerCase())
        const matchesDuration = this.filters.duration === 'all' || 
          this.checkDurationMatch(resource.duration, this.filters.duration)
        
        return matchesCategory && matchesType && matchesSearch && matchesDuration
      })

      return this.applySorting(filtered)
    },
    
    paginatedResources() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredResources.slice(start, end)
    },
    
    totalPages() {
      return Math.ceil(this.filteredResources.length / this.itemsPerPage)
    }
  },
  watch: {
    filters: {
      handler() {
        this.currentPage = 1
      },
      deep: true
    }
  },
  async created() {
    await this.fetchResourcesData()
  },
  methods: {
    async fetchResourcesData() {
      this.loading = true
      try {
        this.resources = await fetchSelfCareResources()
        // Add mock data for demo purposes
        this.resources = this.resources.map(resource => ({
          ...resource,
          date: resource.date || new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30 * 6)).toISOString(),
          popularity: resource.popularity || Math.floor(Math.random() * 1000),
          duration: resource.duration || ['under5', '5to15', '15to30', 'over30'][Math.floor(Math.random() * 4)],
          categories: resource.categories || [this.categories[Math.floor(Math.random() * (this.categories.length - 1)) + 1].id]
        }))
      } catch (error) {
        console.error('Error fetching self-care resources:', error)
        this.$toast.error('Failed to load resources. Please try again later.')
      } finally {
        this.loading = false
      }
    },
    
    handleSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.currentPage = 1
      }, 300)
    },
    
    clearSearch() {
      this.filters.search = ''
      this.currentPage = 1
    },
    
    setQuickFilter(categoryId) {
      if (categoryId === 'quick') {
        this.filters.duration = 'under5'
        this.filters.category = 'all'
      } else {
        this.filters.category = categoryId
        this.filters.duration = 'all'
      }
      this.currentPage = 1
    },
    
    getCategoryName(id) {
      const category = this.categories.find(c => c.id === id)
      return category ? category.name : ''
    },
    
    resetFilters() {
      this.filters = {
        category: 'all',
        type: 'all',
        duration: 'all',
        search: ''
      }
      this.sortBy = 'relevance'
      this.currentPage = 1
    },
    
    toggleSavedResource(resourceId) {
      const index = this.savedResources.indexOf(resourceId)
      if (index === -1) {
        this.savedResources.push(resourceId)
        this.$toast.success('Added to your self-care collection')
      } else {
        this.savedResources.splice(index, 1)
        this.$toast.info('Removed from saved')
      }
      localStorage.setItem('savedSelfCareResources', JSON.stringify(this.savedResources))
    },
    
    isResourceSaved(resourceId) {
      return this.savedResources.includes(resourceId)
    },
    
    checkDurationMatch(resourceDuration, filterDuration) {
      if (filterDuration === 'all') return true
      return resourceDuration === filterDuration
    },
    
    applySorting(resources) {
      switch (this.sortBy) {
        case 'newest':
          return [...resources].sort((a, b) => new Date(b.date) - new Date(a.date))
        case 'popular':
          return [...resources].sort((a, b) => b.popularity - a.popularity)
        case 'time-asc':
          const durationOrder = ['under5', '5to15', '15to30', 'over30']
          return [...resources].sort((a, b) => durationOrder.indexOf(a.duration) - durationOrder.indexOf(b.duration))
        case 'time-desc':
          const reverseDurationOrder = ['over30', '15to30', '5to15', 'under5']
          return [...resources].sort((a, b) => reverseDurationOrder.indexOf(a.duration) - reverseDurationOrder.indexOf(b.duration))
        default:
          if (this.filters.search) {
            return [...resources].sort((a, b) => {
              const aTitleMatch = a.title.toLowerCase().includes(this.filters.search.toLowerCase())
              const bTitleMatch = b.title.toLowerCase().includes(this.filters.search.toLowerCase())
              
              if (aTitleMatch && !bTitleMatch) return -1
              if (!aTitleMatch && bTitleMatch) return 1
              
              const aDescMatch = a.description.toLowerCase().includes(this.filters.search.toLowerCase())
              const bDescMatch = b.description.toLowerCase().includes(this.filters.search.toLowerCase())
              
              if (aDescMatch && !bDescMatch) return -1
              if (!aDescMatch && bDescMatch) return 1
              
              return b.popularity - a.popularity
            })
          }
          return [...resources].sort((a, b) => b.popularity - a.popularity)
      }
    },
    
    sortResources() {
      this.currentPage = 1
    },
    
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    
    viewResourceDetail(resource) {
      this.selectedResource = resource
    }
  }
}
</script>

<style scoped lang="scss">
// Design System Variables
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

// Base Styles
.self-care-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $gray-extra-light;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: $dark;
  width: 100%;
  max-width: 100%;
}

// Hero Section
.self-care-hero {
  background: linear-gradient(135deg, $primary 0%, $primary-dark 100%);
  color: $white;
  padding: 4rem 1.5rem 5rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 0;
    right: 0;
    height: 100px;
    background: $gray-extra-light;
    border-radius: 50% 50% 0 0 / 100%;
    transform: scale(2);
  }

  .hero-content {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    text-align: center;
    width: 100%;
    padding: 0 2rem;
  }

  h1 {
    font-size: 2.75rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    line-height: 1.2;
  }

  .subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto 2.5rem;
    line-height: 1.6;
  }
}

// Search Container
.search-container {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.search-bar {
  display: flex;
  align-items: center;
  background: $white;
  border-radius: $border-radius;
  padding: 1rem 1.5rem;
  box-shadow: $shadow-md;
  transition: $transition;
  margin-bottom: 1.5rem;
  width: 100%;
  
  &:focus-within {
    box-shadow: 0 0 0 3px rgba($white, 0.3), $shadow-lg;
  }

  i {
    color: $gray;
    margin-right: 1rem;
    font-size: 1.2rem;
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 1.1rem;
    color: $dark;
    padding: 0.25rem 0;
    
    &::placeholder {
      color: $gray-light;
    }
    
    &:focus {
      outline: none;
    }
  }

  .clear-btn {
    background: none;
    border: none;
    color: $gray;
    cursor: pointer;
    padding: 0.25rem;
    margin-left: 0.75rem;
    transition: $transition;
    font-size: 1.1rem;
    
    &:hover {
      color: $dark;
    }
  }
}

.quick-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  
  button {
    background: rgba($white, 0.15);
    border: none;
    color: $white;
    padding: 0.75rem 1.25rem;
    border-radius: 24px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: $transition;
    backdrop-filter: blur(5px);
    min-width: 100px;
    
    &:hover {
      background: rgba($white, 0.25);
    }
    
    &.active {
      background: $white;
      color: $primary-dark;
      font-weight: 600;
      box-shadow: $shadow-sm;
    }
  }
}

// Main Content Layout
.main-container {
  display: flex;
  max-width: 1600px;
  margin: -2rem auto 0;
  padding: 0 2rem 4rem;
  gap: 2.5rem;
  position: relative;
  z-index: 2;
  width: 100%;
}

// Sidebar Filters
.sidebar-filters {
  flex: 0 0 300px;
  position: sticky;
  top: 1rem;
  align-self: flex-start;
  height: calc(100vh - 2rem);
  overflow-y: auto;
  
  .filter-section {
    background: $white;
    border-radius: $border-radius;
    padding: 1.75rem;
    box-shadow: $shadow-sm;
    width: 100%;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    color: $dark;
    font-weight: 700;
  }

  .filter-group {
    margin-bottom: 2rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    h4 {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: $gray;
      margin-bottom: 1rem;
      font-weight: 700;
    }
  }

  .filter-options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    
    label {
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: $transition;
      font-size: 1rem;
      
      &:hover {
        background: $gray-extra-light;
      }
      
      &.active {
        background: $primary-light;
        color: $primary-dark;
        font-weight: 600;
      }
      
      input {
        margin-right: 1rem;
        appearance: none;
        width: 18px;
        height: 18px;
        border: 2px solid $gray-light;
        border-radius: 4px;
        transition: $transition;
        position: relative;
        
        &:checked {
          background-color: $primary;
          border-color: $primary;
          
          &::after {
            content: '';
            position: absolute;
            left: 4px;
            top: 1px;
            width: 5px;
            height: 10px;
            border: solid $white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }
        }
      }
    }
  }
}

// Resources Content Area
.resources-content {
  flex: 1;
  min-width: 0;
  width: 100%;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 100%;
  
  .results-info {
    h2 {
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
      color: $dark;
      font-weight: 700;
    }
    
    .results-count {
      color: $gray;
      font-size: 1rem;
    }
  }
  
  .sort-controls {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  
  .sort-select {
    position: relative;
    
    label {
      font-size: 0.95rem;
      color: $gray;
      margin-right: 0.75rem;
      font-weight: 500;
    }
    
    select {
      appearance: none;
      background: $white;
      border: 1px solid $gray-light;
      border-radius: 8px;
      padding: 0.75rem 2.5rem 0.75rem 1.25rem;
      font-size: 1rem;
      cursor: pointer;
      transition: $transition;
      min-width: 180px;
      
      &:focus {
        outline: none;
        border-color: $primary;
        box-shadow: 0 0 0 3px $primary-light;
      }
    }
    
    i {
      position: absolute;
      right: 1.25rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: $gray;
      font-size: 0.9rem;
    }
  }
  
  .view-toggle {
    background: $white;
    border: 1px solid $gray-light;
    border-radius: 8px;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: $transition;
    color: $gray;
    
    &:hover {
      border-color: $gray;
      color: $dark;
    }
    
    i {
      font-size: 1.1rem;
    }
  }
}

// Resources Display
.resources-display {
  width: 100%;
  
  &.grid-view {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
  }
  
  &.list-view {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
}

// Loading State
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  background: $white;
  border-radius: $border-radius;
  width: 100%;
  
  .spinner {
    width: 56px;
    height: 56px;
    border: 4px solid $primary-light;
    border-top-color: $primary;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 2rem;
  }
  
  p {
    color: $gray;
    font-size: 1.1rem;
  }
}

// Empty State
.empty-state {
  background: $white;
  border-radius: $border-radius;
  padding: 4rem 2rem;
  text-align: center;
  width: 100%;
  
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
  
  .btn-reset {
    background: $primary-light;
    color: $primary-dark;
    border: none;
    border-radius: 8px;
    padding: 1rem 2rem;
    font-weight: 600;
    cursor: pointer;
    transition: $transition;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;
    
    &:hover {
      background: darken($primary-light, 5%);
      transform: translateY(-2px);
    }
    
    i {
      font-size: 1rem;
    }
  }
}

// Pagination
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  gap: 1.5rem;
  width: 100%;
  
  .page-btn {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 1px solid $gray-light;
    background: $white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: $transition;
    font-size: 1.1rem;
    
    &:hover:not(:disabled) {
      border-color: $primary;
      color: $primary;
      transform: scale(1.05);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .page-info {
    color: $gray;
    font-size: 1rem;
    font-weight: 500;
  }
}

// Animations
@keyframes spin {
  to { transform: rotate(360deg); }
}

// Responsive Design
@media (max-width: 1440px) {
  .main-container {
    max-width: 1200px;
  }
}

@media (max-width: 1200px) {
  .main-container {
    max-width: 1000px;
  }
  
  .resources-display.grid-view {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 1024px) {
  .main-container {
    flex-direction: column;
    max-width: 800px;
  }
  
  .sidebar-filters {
    position: static;
    flex: 0 0 auto;
    width: 100%;
    height: auto;
    margin-bottom: 2rem;
  }
  
  .self-care-hero {
    padding: 3rem 1.5rem 4rem;
    
    h1 {
      font-size: 2.5rem;
    }
  }
}

@media (max-width: 768px) {
  .self-care-hero {
    padding: 2.5rem 1rem 3.5rem;
    
    h1 {
      font-size: 2.25rem;
    }
    
    .subtitle {
      font-size: 1.1rem;
    }
  }
  
  .content-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    
    .sort-controls {
      justify-content: space-between;
      width: 100%;
    }
  }
  
  .quick-filters {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scrollbar-width: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    button {
      flex: 0 0 auto;
    }
  }
  
  .search-bar {
    padding: 0.75rem 1.25rem;
    
    input {
      font-size: 1rem;
    }
  }
}

@media (max-width: 576px) {
  .main-container {
    padding: 0 1.25rem 3rem;
  }
  
  .self-care-hero {
    padding: 2rem 1rem 3rem;
    
    h1 {
      font-size: 2rem;
    }
    
    .hero-content {
      padding: 0 1rem;
    }
  }
  
  .resources-display.grid-view {
    grid-template-columns: 1fr;
  }
  
  .filter-options {
    label {
      font-size: 0.95rem;
      padding: 0.5rem 0.75rem;
    }
  }
  
  .sort-select {
    select {
      min-width: 150px;
      padding: 0.5rem 2rem 0.5rem 1rem;
    }
  }
}
</style>