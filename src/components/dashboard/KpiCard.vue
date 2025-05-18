<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  icon: string
  trend?: number
  color: string
}>()

const formatTrend = (trend: number | undefined) => {
  if (trend === undefined) return null
  return trend > 0 ? `+${trend}%` : `${trend}%`
}

const getTrendClass = (trend: number | undefined) => {
  if (trend === undefined) return ''
  return trend >= 0 ? 'text-success-600' : 'text-error-600'
}

const getIconClass = (color: string) => {
  const colorMap: Record<string, string> = {
    'primary': 'bg-primary-100 text-primary-600',
    'secondary': 'bg-secondary-100 text-secondary-600',
    'accent': 'bg-accent-100 text-accent-600',
    'success': 'bg-success-100 text-success-600',
  }
  return colorMap[color] || 'bg-gray-100 text-gray-600'
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-gray-500">{{ title }}</p>
        <h4 class="mt-2 text-2xl font-bold text-gray-800">{{ value }}</h4>
        <div v-if="trend !== undefined" class="mt-1 flex items-center">
          <span :class="getTrendClass(trend)">{{ formatTrend(trend) }}</span>
          <span class="ml-1 text-xs text-gray-500">vs. last period</span>
        </div>
      </div>
      <div :class="['p-3 rounded-full', getIconClass(color)]">
        <i :class="['pi', icon, 'text-xl']"></i>
      </div>
    </div>
  </div>
</template>