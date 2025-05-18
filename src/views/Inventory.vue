<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/inventory/ProductCard.vue'
import { Product } from '../services/mockData'

const productStore = useProductStore()
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('name')
const sortOrder = ref('asc')

const categories = computed(() => {
  const uniqueCategories = new Set(productStore.products.map(p => p.category))
  return ['All', ...Array.from(uniqueCategories)]
})

const filteredProducts = computed(() => {
  let result = [...productStore.products]
  
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    )
  }
  
  
  if (selectedCategory.value && selectedCategory.value !== 'All') {
    result = result.filter(p => p.category === selectedCategory.value)
  }
  
  
  result.sort((a, b) => {
    let aValue: any = a[sortBy.value as keyof Product]
    let bValue: any = b[sortBy.value as keyof Product]
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
  
  return result
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  sortBy.value = 'name'
  sortOrder.value = 'asc'
}

onMounted(() => {
  if (productStore.products.length === 0) {
    productStore.fetchProducts()
  }
})
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Inventory Management</h1>
      <p class="text-gray-600">Manage your product inventory</p>
    </div>
    
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="md:col-span-2">
          <label class="label" for="search">Search Products</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
              <i class="pi pi-search text-gray-500"></i>
            </span>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, description, or category"
              class="input w-full pl-10"
            />
          </div>
        </div>
        
        <div>
          <label class="label" for="category">Category</label>
          <select
            id="category"
            v-model="selectedCategory"
            class="input w-full"
          >
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="label" for="sort">Sort By</label>
          <div class="flex space-x-2">
            <select
              id="sort"
              v-model="sortBy"
              class="input flex-1"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="stock">Stock</option>
              <option value="category">Category</option>
            </select>
            <button
              @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
              class="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <i :class="['pi', sortOrder === 'asc' ? 'pi-sort-up' : 'pi-sort-down']"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div class="flex justify-between items-center mt-4">
        <p class="text-sm text-gray-600">
          Showing {{ filteredProducts.length }} of {{ productStore.products.length }} products
        </p>
        <button
          @click="clearFilters"
          class="text-sm text-primary-600 hover:text-primary-700"
        >
          Clear Filters
        </button>
      </div>
    </div>
    
    <div v-if="productStore.loading" class="p-8 text-center">
      <i class="pi pi-spinner pi-spin text-2xl text-primary-500"></i>
      <p class="mt-2 text-gray-600">Loading products...</p>
    </div>
    
    <div v-else-if="filteredProducts.length === 0" class="p-8 text-center">
      <i class="pi pi-inbox text-4xl text-gray-400"></i>
      <p class="mt-2 text-gray-600">No products found with the current filters.</p>
      <button
        @click="clearFilters"
        class="mt-2 text-primary-600 hover:text-primary-700"
      >
        Clear filters
      </button>
    </div>
    
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>