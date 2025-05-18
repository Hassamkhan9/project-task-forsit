<script setup lang="ts">
import { ref } from 'vue'

defineEmits(['toggle-sidebar'])

const dropdownOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}
</script>

<template>
  <header class="bg-white shadow-sm z-10">
    <div class="flex items-center justify-between px-4 py-3">
      <div class="flex items-center">
        <button
          @click="$emit('toggle-sidebar')"
          class="text-gray-500 focus:outline-none focus:text-gray-700"
        >
          <i class="pi pi-bars text-xl"></i>
        </button>
        
        <div class="relative mx-4 lg:mx-0 w-56 md:w-64">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
            <i class="pi pi-search text-gray-500"></i>
          </span>
          <input
            class="input w-full pl-10"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
      
      <div class="flex items-center">
        <button class="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative">
          <span class="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
          <i class="pi pi-bell text-xl"></i>
        </button>
        
        <div class="relative ml-3">
          <div>
            <button
              @click="toggleDropdown"
              class="flex text-sm bg-primary-500 rounded-full focus:outline-none"
            >
              <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                AM
              </div>
            </button>
          </div>
          
          <div
            v-if="dropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
          >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>