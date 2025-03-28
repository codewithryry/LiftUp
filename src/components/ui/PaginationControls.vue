<template>
  <div class="pagination-controls">
    <button 
      v-for="page in visiblePages" 
      :key="page"
      @click="$emit('page-change', page)"
      :class="{
        'page-btn': true,
        'current': page === currentPage,
        'ellipsis': page === '...'
      }"
      :disabled="page === '...'"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    maxVisible: {
      type: Number,
      default: 5
    }
  },
  computed: {
    visiblePages() {
      const range = []
      const half = Math.floor(this.maxVisible / 2)
      let start = Math.max(1, this.currentPage - half)
      let end = Math.min(this.totalPages, start + this.maxVisible - 1)
      
      if (end - start < this.maxVisible - 1) {
        start = Math.max(1, end - this.maxVisible + 1)
      }
      
      // Always show first page
      if (start > 1) {
        range.push(1)
        if (start > 2) range.push('...')
      }
      
      // Middle range
      for (let i = start; i <= end; i++) {
        if (i >= 1 && i <= this.totalPages) {
          range.push(i)
        }
      }
      
      // Always show last page
      if (end < this.totalPages) {
        if (end < this.totalPages - 1) range.push('...')
        range.push(this.totalPages)
      }
      
      return range
    }
  }
}
</script>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.page-btn {
  min-width: 40px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid var(--gray-light);
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  
  &:hover:not(:disabled, .current, .ellipsis) {
    border-color: var(--primary);
    color: var(--primary);
  }
  
  &.current {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
    font-weight: 500;
  }
  
  &.ellipsis {
    border: none;
    background: transparent;
    cursor: default;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>