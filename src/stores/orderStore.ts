import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  getOrders, 
  getRevenueByPeriod, 
  getRevenueByCategory,
  getTotalRevenue,
  getTotalOrders,
  getAverageOrderValue
} from '../services/mockData'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedPeriod = ref<'day' | 'week' | 'month' | 'year'>('month')

  const fetchOrders = async () => {
    loading.value = true
    error.value = null
    
    try {
      orders.value = getOrders() as any
    } catch (err) {
      error.value = 'Failed to fetch orders'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const revenueByPeriod = computed(() => {
    return getRevenueByPeriod(selectedPeriod.value)
  })

  const revenueByCategory = computed(() => {
    return getRevenueByCategory()
  })

  const totalRevenue = computed(() => {
    return getTotalRevenue()
  })

  const totalOrders = computed(() => {
    return getTotalOrders()
  })

  const averageOrderValue = computed(() => {
    return getAverageOrderValue()
  })

  const setPeriod = (period: 'day' | 'week' | 'month' | 'year') => {
    selectedPeriod.value = period
  }

  return {
    orders,
    loading,
    error,
    selectedPeriod,
    revenueByPeriod,
    revenueByCategory,
    totalRevenue,
    totalOrders,
    averageOrderValue,
    fetchOrders,
    setPeriod
  }
})