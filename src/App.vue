<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/layout/Sidebar.vue'
import Header from './components/layout/Header.vue'

const sidebarCollapsed = ref(false)


const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <Sidebar :collapsed="sidebarCollapsed" />
    
    <div class="flex flex-col flex-1 overflow-hidden">
      <Header @toggle-sidebar="toggleSidebar" />
      
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>