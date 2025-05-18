<script setup lang="ts">
import { ref } from 'vue'
import { Product } from '../../services/mockData'
import { useProductStore } from '../../stores/productStore'

const props = defineProps<{
  product: Product
}>()

const productStore = useProductStore()
const stockInput = ref(props.product.stock)
const isEditing = ref(false)
const isUpdating = ref(false)

const toggleEdit = () => {
  isEditing.value = !isEditing.value
  if (!isEditing.value) {
    stockInput.value = props.product.stock
  }
}

const updateStock = async () => {
  if (stockInput.value === props.product.stock) {
    isEditing.value = false
    return
  }
  
  isUpdating.value = true
  try {
    await productStore.updateProductStock(props.product.id, stockInput.value)
    isEditing.value = false
  } catch (error) {
    console.error('Failed to update stock', error)
  } finally {
    isUpdating.value = false
  }
}

const getStockStatusClass = (stock: number, threshold: number) => {
  if (stock === 0) return 'bg-error-100 text-error-800'
  if (stock <= threshold) return 'bg-warning-100 text-warning-800'
  return 'bg-success-100 text-success-800'
}

const getStockLabel = (stock: number, threshold: number) => {
  if (stock === 0) return 'Out of Stock'
  if (stock <= threshold) return 'Low Stock'
  return 'In Stock'
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div class="h-48 overflow-hidden">
      <img :src="product.image" :alt="product.name" class="w-full h-full object-cover">
    </div>
    <div class="p-4">
      <div class="flex justify-between items-start">
        <h3 class="text-lg font-semibold text-gray-800">{{ product.name }}</h3>
        <span 
          :class="['px-2 py-1 rounded-full text-xs font-medium', 
                  getStockStatusClass(product.stock, product.threshold)]"
        >
          {{ getStockLabel(product.stock, product.threshold) }}
        </span>
      </div>
      <p class="text-gray-500 text-sm mt-1">{{ product.category }}</p>
      <p class="font-bold text-primary-600 mt-2">${{ product.price.toFixed(2) }}</p>
      
      <div class="mt-3 border-t pt-3">
        <div v-if="!isEditing" class="flex justify-between items-center">
          <div>
            <span class="text-sm text-gray-500">Stock: </span>
            <span class="font-medium">{{ product.stock }}</span>
          </div>
          <button 
            @click="toggleEdit" 
            class="text-primary-600 hover:text-primary-700 text-sm"
          >
            Update
          </button>
        </div>
        <div v-else class="flex items-center space-x-2">
          <input 
            v-model="stockInput"
            type="number"
            min="0"
            class="input w-20 text-sm"
          />
          <button 
            @click="updateStock"
            :disabled="isUpdating"
            class="btn btn-primary text-sm py-1 px-3"
          >
            <i v-if="isUpdating" class="pi pi-spinner pi-spin mr-1"></i>
            Save
          </button>
          <button 
            @click="toggleEdit"
            class="text-gray-600 hover:text-gray-800 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>