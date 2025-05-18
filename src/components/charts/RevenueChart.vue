<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js'
import { useOrderStore } from '../../stores/orderStore'

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const orderStore = useOrderStore()
const selectedPeriod = ref<'day' | 'week' | 'month' | 'year'>('month')

const periodOptions = [
  { label: 'Daily', value: 'day' },
  { label: 'Weekly', value: 'week' },
  { label: 'Monthly', value: 'month' },
  { label: 'Yearly', value: 'year' }
]

const chartData = computed(() => {
  const revenueData = orderStore.revenueByPeriod

  return {
    labels: revenueData.map(item => item.label),
    datasets: [
      {
        label: 'Revenue',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: '#2563eb',
        borderWidth: 2,
        data: revenueData.map(item => item.value),
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#1d4ed8',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  }
})

const chartOptions = <ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        font: {
          family: 'Inter',
          size: 12
        }
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
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
        label: (context: { dataset: { label: string }; parsed: { y: number | bigint | null } }) => {
          let label = context.dataset.label || ''
          if (label) label += ': '
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(context.parsed.y)
          }
          return label
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: 'Inter'
        }
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        font: {
          family: 'Inter'
        },
        callback: function (value: { toLocaleString: () => string }) {
          return '$' + value.toLocaleString()
        }
      }
    }
  },
  animation: {
    duration: 1000,
    easing: 'easeOutQuart' 
  }
}))

const changePeriod = (period: 'day' | 'week' | 'month' | 'year') => {
  selectedPeriod.value = period
  orderStore.setPeriod(period)
}

onMounted(() => {
  if (!orderStore.orders.length) {
    orderStore.fetchOrders()
  }
})

watch(selectedPeriod, (newPeriod) => {
  orderStore.setPeriod(newPeriod)
})
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-800">Revenue Trends</h3>
      <div class="flex space-x-2 mt-2 sm:mt-0">
        <button
          v-for="option in periodOptions"
          :key="option.value"
          :class="[
            'px-3 py-1 text-sm rounded-md transition-colors',
            selectedPeriod === option.value
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
          @click="changePeriod(option.value as  'day' | 'week' | 'month' | 'year')"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
    
    <div class="h-64 md:h-80">
      <Line 
        :data="chartData" 
        :options="chartOptions"
        class="h-full w-full" 
      />
    </div>
  </div>
</template>