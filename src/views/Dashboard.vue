<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useOrderStore } from '../stores/orderStore'
import { useProductStore } from '../stores/productStore'
import RevenueChart from '../components/charts/RevenueChart.vue'
import CategoryChart from '../components/charts/CategoryChart.vue'
import KpiCard from '../components/dashboard/KpiCard.vue'
import LowStockAlert from '../components/inventory/LowStockAlert.vue'

const orderStore = useOrderStore()
const productStore = useProductStore()

const formattedTotalRevenue = computed(() => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    orderStore.totalRevenue
  )
})

const formattedAverageOrder = computed(() => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    orderStore.averageOrderValue
  )
})

onMounted(() => {
  orderStore.fetchOrders()
  productStore.fetchProducts()
})
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600">Welcome to your e-commerce analytics dashboard</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <KpiCard
        title="Total Revenue"
        :value="formattedTotalRevenue"
        icon="pi-dollar"
        :trend="12.5"
        color="primary"
      />
      
      <KpiCard
        title="Total Orders"
        :value="orderStore.totalOrders.toLocaleString()"
        icon="pi-shopping-cart"
        :trend="8.2"
        color="secondary"
      />
      
      <KpiCard
        title="Average Order Value"
        :value="formattedAverageOrder"
        icon="pi-chart-line"
        :trend="3.1"
        color="accent"
      />
      
      <KpiCard
        title="Total Products"
        :value="productStore.products.length.toLocaleString()"
        icon="pi-box"
        color="success"
      />
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <RevenueChart class="lg:col-span-2"/>
      <CategoryChart />
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <LowStockAlert class="lg:col-span-3 xl:col-span-1" />
    </div>
  </div>
</template>