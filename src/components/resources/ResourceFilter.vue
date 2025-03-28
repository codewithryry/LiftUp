<template>
    <div class="resource-filter">
      <div class="filter-group">
        <label for="category">Category</label>
        <select id="category" v-model="localFilters.category" @change="updateFilters">
          <option 
            v-for="category in categories" 
            :key="category.id" 
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="type">Type</label>
        <select id="type" v-model="localFilters.type" @change="updateFilters">
          <option 
            v-for="type in types" 
            :key="type.id" 
            :value="type.id"
          >
            {{ type.name }}
          </option>
        </select>
      </div>
      
      <div class="filter-group search">
        <label for="search">Search</label>
        <input 
          type="text" 
          id="search" 
          v-model="localFilters.search" 
          placeholder="Search resources..."
          @input="updateFilters"
        >
        <i class="icon-search"></i>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      categories: {
        type: Array,
        required: true
      },
      types: {
        type: Array,
        required: true
      },
      filters: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        localFilters: { ...this.filters }
      }
    },
    watch: {
      filters(newVal) {
        this.localFilters = { ...newVal }
      }
    },
    methods: {
      updateFilters() {
        this.$emit('filter-changed', this.localFilters)
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  .resource-filter {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .filter-group {
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: $dark;
      font-size: 0.9rem;
    }
    
    select, input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      
      &:focus {
        border-color: $primary;
        outline: none;
      }
    }
  }
  
  .search {
    position: relative;
    
    input {
      padding-left: 35px;
    }
    
    .icon-search {
      position: absolute;
      left: 10px;
      top: 38px;
      color: $gray;
    }
  }
  
  @media (max-width: 768px) {
    .resource-filter {
      grid-template-columns: 1fr;
    }
  }
  </style>