<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '../../stores/productStore'

const productStore = useProductStore()

onMounted(() => {
  if (productStore.lowStockProducts.length === 0) {
    productStore.fetchLowStockProducts()
  }
})
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-800">Low Stock Alerts</h3>
      <span class="bg-warning-100 text-warning-700 px-2 py-1 rounded-full text-xs font-semibold">
        {{ productStore.lowStockProducts.length }} items
      </span>
    </div>
    
    <div v-if="productStore.loading" class="p-4 text-center">
      <i class="pi pi-spinner pi-spin text-xl text-primary-500"></i>
    </div>
    
    <div v-else-if="productStore.lowStockProducts.length === 0" class="p-4 text-center">
      <p class="text-gray-500">No low stock items found.</p>
    </div>
    
    <ul v-else class="divide-y divide-gray-100">
      <li v-for="product in productStore.lowStockProducts" :key="product.id" class="py-3">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-md overflow-hidden">
              <img :src="product.image" :alt="product.name" class="w-full h-full object-cover">
            </div>
            <div>
              <p class="font-medium text-gray-800">{{ product.name }}</p>
              <p class="text-sm text-gray-500">{{ product.category }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-semibold" :class="product.stock === 0 ? 'text-error-600' : 'text-warning-600'">
              {{ product.stock }} left
            </p>
            <p class="text-xs text-gray-500">Min: {{ product.threshold }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>