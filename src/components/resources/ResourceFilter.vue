<template>
  <div class="resource-filter">
    <!-- Mobile Filter Toggle -->
    <button 
      class="mobile-filter-toggle" 
      @click="toggleMobileFilters"
      aria-label="Open filters"
    >
      <i class="fas fa-filter"></i>
      <span class="filter-text">Filters</span>
      <span v-if="activeFilterCount > 0" class="filter-badge">{{ activeFilterCount }}</span>
    </button>

    <!-- Overlay when filters are open -->
    <div 
      class="filter-overlay" 
      :class="{ 'active': showMobileFilters }"
      @click="showMobileFilters = false"
    ></div>

    <!-- Filter Panel -->
    <div 
      class="filter-panel" 
      :class="{ 'mobile-active': showMobileFilters }"
      aria-modal="true"
      aria-hidden="!showMobileFilters"
    >
      <div class="filter-header">
        <h3>Filter Resources</h3>
        <button 
          class="close-filters" 
          @click="showMobileFilters = false"
          aria-label="Close filters"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="filter-content">
        <!-- Category Filter -->
        <div class="filter-group">
          <button 
            class="filter-group-header"
            @click="toggleGroup('category')"
            aria-expanded="expandedGroups.includes('category')"
            aria-controls="category-filters"
          >
            <h4>Categories</h4>
            <i 
              class="fas" 
              :class="expandedGroups.includes('category') ? 'fa-chevron-up' : 'fa-chevron-down'"
            ></i>
          </button>
          <div 
            id="category-filters"
            class="filter-options"
            :class="{ 'expanded': expandedGroups.includes('category') }"
          >
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
                @change="applyFilters"
                :checked="filters.category === category.id"
              >
              <span>{{ category.name }}</span>
            </label>
          </div>
        </div>

        <!-- Type Filter -->
        <div class="filter-group">
          <button 
            class="filter-group-header"
            @click="toggleGroup('type')"
            aria-expanded="expandedGroups.includes('type')"
            aria-controls="type-filters"
          >
            <h4>Resource Type</h4>
            <i 
              class="fas" 
              :class="expandedGroups.includes('type') ? 'fa-chevron-up' : 'fa-chevron-down'"
            ></i>
          </button>
          <div 
            id="type-filters"
            class="filter-options"
            :class="{ 'expanded': expandedGroups.includes('type') }"
          >
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
                @change="applyFilters"
                :checked="filters.type === type.id"
              >
              <span>{{ type.name }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Mobile Filter Actions -->
      <div class="mobile-filter-actions">
        <button 
          class="btn-reset" 
          @click="resetFilters"
          :disabled="activeFilterCount === 0"
        >
          Reset
        </button>
        <button 
          class="btn-apply" 
          @click="applyAndClose"
        >
          Show Results
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResourceFilter',
  props: {
    categories: {
      type: Array,
      required: true,
      default: () => [
        { id: 'all', name: 'All Categories' },
        { id: 'depression', name: 'Depression' },
        { id: 'anxiety', name: 'Anxiety' },
        { id: 'stress', name: 'Stress' }
      ]
    },
    types: {
      type: Array,
      required: true,
      default: () => [
        { id: 'all', name: 'All Types' },
        { id: 'article', name: 'Articles' },
        { id: 'video', name: 'Videos' },
        { id: 'tool', name: 'Tools' }
      ]
    },
    initialFilters: {
      type: Object,
      default: () => ({
        category: 'all',
        type: 'all'
      })
    }
  },
  data() {
    return {
      filters: { ...this.initialFilters },
      showMobileFilters: false,
      expandedGroups: ['category', 'type'] // Start with all groups expanded
    }
  },
  computed: {
    activeFilterCount() {
      let count = 0
      if (this.filters.category !== 'all') count++
      if (this.filters.type !== 'all') count++
      return count
    }
  },
  methods: {
    toggleMobileFilters() {
      this.showMobileFilters = !this.showMobileFilters
    },
    applyFilters() {
      this.$emit('filter-change', this.filters)
    },
    applyAndClose() {
      this.applyFilters()
      this.showMobileFilters = false
    },
    resetFilters() {
      this.filters = {
        category: 'all',
        type: 'all'
      }
      this.applyFilters()
    },
    toggleGroup(group) {
      if (this.expandedGroups.includes(group)) {
        this.expandedGroups = this.expandedGroups.filter(g => g !== group)
      } else {
        this.expandedGroups.push(group)
      }
    }
  },
  watch: {
    showMobileFilters(newVal) {
      if (process.client) {
        // Prevent body scroll when filters are open
        if (newVal) {
          document.body.style.overflow = 'hidden'
          document.body.style.position = 'fixed'
          document.body.style.width = '100%'
        } else {
          document.body.style.overflow = ''
          document.body.style.position = ''
          document.body.style.width = ''
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.resource-filter {
  position: relative;
}

.mobile-filter-toggle {
  display: none; // Hidden by default, shown on mobile
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  background: $primary;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  box-shadow: $shadow-lg;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:active {
    transform: translateX(-50%) scale(0.98);
  }
  
  i {
    font-size: 1rem;
  }
  
  .filter-text {
    margin: 0 0.25rem;
  }
  
  .filter-badge {
    background: $white;
    color: $primary;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
  }
}

.filter-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  
  &.active {
    opacity: 1;
    pointer-events: all;
  }
}

.filter-panel {
  background: $white;
  border-radius: $border-radius;
  padding: 1.5rem;
  box-shadow: $shadow-sm;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  
  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid $gray-light;
    
    h3 {
      font-size: 1.25rem;
      color: $dark;
      font-weight: 700;
      margin: 0;
    }
    
    .close-filters {
      display: none;
      background: none;
      border: none;
      color: $gray;
      font-size: 1.25rem;
      cursor: pointer;
      padding: 0.5rem;
    }
  }
  
  .filter-content {
    flex: 1;
    overflow-y: auto;
    padding-right: 0.5rem;
    margin-right: -0.5rem;
  }
}

.filter-group {
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .filter-group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: none;
    border: none;
    padding: 0.75rem 0;
    cursor: pointer;
    
    h4 {
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: $gray-dark;
      margin: 0;
      font-weight: 700;
      text-align: left;
    }
    
    i {
      color: $gray;
      transition: transform 0.2s ease;
    }
  }
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  
  &.expanded {
    max-height: 500px; // Adjust based on your content
    padding: 0.5rem 0;
  }
  
  label {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: $transition;
    font-size: 1rem;
    position: relative;
    
    &:hover {
      background: $gray-extra-light;
    }
    
    &.active {
      background: $primary-light;
      color: $primary-dark;
      font-weight: 600;
    }
    
    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      
      &:checked + span::before {
        background-color: $primary;
        border-color: $primary;
      }
      
      &:checked + span::after {
        opacity: 1;
      }
    }
    
    span {
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 2rem;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        border: 2px solid $gray-light;
        border-radius: 4px;
        transition: $transition;
      }
      
      &::after {
        content: '';
        position: absolute;
        left: 7px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid $white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        opacity: 0;
        transition: $transition;
      }
    }
  }
}

.mobile-filter-actions {
  display: none;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: $white;
  padding: 1rem;
  margin: 1.5rem -1.5rem -1.5rem;
  border-top: 1px solid $gray-light;
  display: flex;
  gap: 1rem;
  z-index: 1;
  
  button {
    flex: 1;
    padding: 1rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: $transition;
    
    &:active {
      transform: scale(0.98);
    }
    
    &.btn-reset {
      background: $gray-extra-light;
      color: $gray-dark;
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
    }
    
    &.btn-apply {
      background: $primary;
      color: $white;
      
      &:hover {
        background: $primary-dark;
      }
    }
  }
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .mobile-filter-toggle {
    display: flex;
  }
  
  .filter-panel {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 100;
    width: 90%;
    max-width: 380px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    border-radius: 0;
    padding: 1.25rem;
    box-shadow: $shadow-lg;
    max-height: none;
    
    &.mobile-active {
      transform: translateX(0);
    }
    
    .filter-header .close-filters {
      display: block;
    }
  }
  
  .mobile-filter-actions {
    display: flex;
  }
}

@media (max-width: 576px) {
  .mobile-filter-toggle {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    bottom: 0.75rem;
    
    .filter-text {
      display: none;
    }
  }
  
  .filter-panel {
    width: 100%;
    max-width: none;
    padding: 1rem;
    
    .filter-content {
      padding-right: 0.25rem;
      margin-right: -0.25rem;
    }
  }
  
  .filter-group {
    margin-bottom: 1rem;
  }
  
  .mobile-filter-actions {
    padding: 0.75rem;
    margin: 1rem -1rem -1rem;
    
    button {
      padding: 0.75rem;
    }
  }
}
</style>