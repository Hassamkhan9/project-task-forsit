<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js'
import { useOrderStore } from '../../stores/orderStore'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

const orderStore = useOrderStore()

const colors = [
  'rgba(59, 130, 246, 0.7)',  // primary
  'rgba(20, 184, 166, 0.7)',  // secondary
  'rgba(245, 158, 11, 0.7)',  // accent
  'rgba(16, 185, 129, 0.7)',  // success
  'rgba(249, 115, 22, 0.7)',  // warning
  'rgba(239, 68, 68, 0.7)'    // error
]

const hoverColors = [
  'rgba(59, 130, 246, 0.9)',  // primary
  'rgba(20, 184, 166, 0.9)',  // secondary
  'rgba(245, 158, 11, 0.9)',  // accent
  'rgba(16, 185, 129, 0.9)',  // success
  'rgba(249, 115, 22, 0.9)',  // warning
  'rgba(239, 68, 68, 0.9)'    // error
]

const chartData = computed(() => {
  const categoryData = orderStore.revenueByCategory

  return {
    labels: categoryData.map(item => item.category),
    datasets: [
      {
        backgroundColor: categoryData.map((_, index) => colors[index % colors.length]),
        hoverBackgroundColor: categoryData.map((_, index) => hoverColors[index % hoverColors.length]),
        borderWidth: 1,
        data: categoryData.map(item => item.total)
      }
    ]
  }
})

const chartOptions = computed<ChartOptions<'pie'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',  // TS now knows this is a valid literal
      labels: {
        boxWidth: 12,
        font: {
          family: 'Inter',
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#1e293b',
      bodyColor: '#334155',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      padding: 10,
      boxPadding: 5,
      usePointStyle: true,
      bodyFont: {
        family: 'Inter'
      },
      callbacks: {
        label: function(context: any) {
          const label = context.label || '';
          const value = context.raw || 0;
          const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
          const percentage = Math.round((value / total) * 100);
          return `${label}: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} (${percentage}%)`;
        }
      }
    }
  },
  animation: {
    animateRotate: true,
    animateScale: true
  }
}))

onMounted(() => {
  if (!orderStore.orders.length) {
    orderStore.fetchOrders()
  }
})
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Revenue by Category</h3>
    <div class="h-64 md:h-80">
      <Pie 
        :data="chartData" 
        :options="chartOptions" 
        class="h-full w-full" 
      />
    </div>
  </div>
</template>