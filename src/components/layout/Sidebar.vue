<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
  collapsed: boolean
}>()

const navigate = (path: string) => {
  router.push(path)
}

const sidebarWidth = computed(() => props.collapsed ? 'w-16' : 'w-64')
</script>

<template>
  <aside :class="['bg-primary-800 text-white transition-all duration-300', sidebarWidth]">
    <div class="py-4 px-3 flex items-center justify-center">
      <span v-if="!collapsed" class="text-xl font-bold">E-Commerce Admin</span>
      <span v-else class="text-xl font-bold">EA</span>
    </div>
    
    <nav class="mt-5 px-2">
      <div
        @click="navigate('/')"
        :class="['flex items-center py-3 px-3 rounded-md cursor-pointer mb-2 transition-colors', 
                $route.path === '/' ? 'bg-primary-700' : 'hover:bg-primary-700']"
      >
        <i class="pi pi-chart-bar text-lg"></i>
        <span v-if="!collapsed" class="ml-3">Dashboard</span>
      </div>
      
      <div
        @click="navigate('/inventory')"
        :class="['flex items-center py-3 px-3 rounded-md cursor-pointer mb-2 transition-colors', 
                $route.path === '/inventory' ? 'bg-primary-700' : 'hover:bg-primary-700']"
      >
        <i class="pi pi-box text-lg"></i>
        <span v-if="!collapsed" class="ml-3">Inventory</span>
      </div>
      
      <div
        @click="navigate('/product-registration')"
        :class="['flex items-center py-3 px-3 rounded-md cursor-pointer mb-2 transition-colors', 
                $route.path === '/product-registration' ? 'bg-primary-700' : 'hover:bg-primary-700']"
      >
        <i class="pi pi-plus-circle text-lg"></i>
        <span v-if="!collapsed" class="ml-3">Add Product</span>
      </div>
    </nav>
  </aside>
</template>