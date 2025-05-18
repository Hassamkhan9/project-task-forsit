import { defineStore } from 'pinia'
import { ref } from 'vue'
import { 
  Product, 
  getProducts, 
  getLowStockProducts, 
  addProduct as addProductService,
  updateProductStock as updateStockService
} from '../services/mockData'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const lowStockProducts = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    
    try {
      products.value = getProducts()
    } catch (err) {
      error.value = 'Failed to fetch products'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const fetchLowStockProducts = async () => {
    loading.value = true
    error.value = null
    
    try {
      lowStockProducts.value = getLowStockProducts()
    } catch (err) {
      error.value = 'Failed to fetch low stock products'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>) => {
    loading.value = true
    error.value = null
    
    try {
      const newProduct = addProductService(product)
      products.value.push(newProduct)
      return newProduct
    } catch (err) {
      error.value = 'Failed to add product'
      console.error(err)
      return null
    } finally {
      loading.value = false
    }
  }

  const updateProductStock = async (id: number, newStock: number) => {
    loading.value = true
    error.value = null
    
    try {
      const updatedProduct = updateStockService(id, newStock)
      if (updatedProduct) {
        const index = products.value.findIndex(p => p.id === id)
        if (index !== -1) {
          products.value[index] = updatedProduct
        }
      }
      return updatedProduct
    } catch (err) {
      error.value = 'Failed to update product stock'
      console.error(err)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    lowStockProducts,
    loading,
    error,
    fetchProducts,
    fetchLowStockProducts,
    addProduct,
    updateProductStock
  }
})