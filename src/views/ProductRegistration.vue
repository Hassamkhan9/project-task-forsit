<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'

const router = useRouter()
const productStore = useProductStore()

// Form state
const formData = reactive({
  name: '',
  description: '',
  category: '',
  price: 0,
  stock: 0,
  threshold: 0,
  image: ''
})

// Form validation
const errors = reactive({
  name: '',
  description: '',
  category: '',
  price: '',
  stock: '',
  threshold: '',
  image: ''
})


const isSubmitting = ref(false)
const showSuccess = ref(false)
const formTouched = ref(false)
const previewImage = ref('')

const categories = [
  'Electronics',
  'Clothing',
  'Furniture',
  'Home & Kitchen',
  'Sports & Outdoors',
  'Beauty & Personal Care',
  'Toys & Games',
  'Books',
  'Other'
]

const validateField = (field: keyof typeof formData) => {
  formTouched.value = true
  
  switch (field) {
    case 'name':
      errors.name = !formData.name ? 'Product name is required' : ''
      break
    case 'description':
      errors.description = !formData.description ? 'Description is required' : ''
      break
    case 'category':
      errors.category = !formData.category ? 'Category is required' : ''
      break
    case 'price':
      errors.price = formData.price <= 0 ? 'Price must be greater than 0' : ''
      break
    case 'stock':
      errors.stock = formData.stock < 0 ? 'Stock cannot be negative' : ''
      break
    case 'threshold':
      errors.threshold = formData.threshold < 0 ? 'Threshold cannot be negative' : ''
      break
    case 'image':
      errors.image = !formData.image ? 'Image URL is required' : ''
      if (formData.image && !isValidUrl(formData.image)) {
        errors.image = 'Please enter a valid URL'
      }
      break
  }
}


const validateForm = () => {
  validateField('name')
  validateField('description')
  validateField('category')
  validateField('price')
  validateField('stock')
  validateField('threshold')
  validateField('image')
  
  return !Object.values(errors).some(error => error)
}

const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString))
  } catch (e) {
    return false
  }
}

const updatePreview = () => {
  if (isValidUrl(formData.image)) {
    previewImage.value = formData.image
  } else {
    previewImage.value = ''
  }
}


const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    await productStore.addProduct({
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: formData.price,
      stock: formData.stock,
      threshold: formData.threshold,
      image: formData.image,
      // createdAt: new Date().toISOString()
    })
    
    showSuccess.value = true
    
    
  formData.name = ''
formData.description = ''
formData.category = ''
formData.price = 0
formData.stock = 0
formData.threshold = 0
formData.image = ''

    formTouched.value = false
    previewImage.value = ''
    
    
    setTimeout(() => {
      router.push('/inventory')
    }, 2000)
  } catch (error) {
    console.error('Failed to add product', error)
  } finally {
    isSubmitting.value = false
  }
}


const resetForm = () => {
  formData.name = ''
  formData.description = ''
  formData.category = ''
  formData.price = 0
  formData.stock = 0
  formData.threshold = 0
  formData.image = ''

  errors.name = ''
  errors.description = ''
  errors.category = ''
  errors.price = ''
  errors.stock = ''
  errors.threshold = ''
  errors.image = ''

  formTouched.value = false
  previewImage.value = ''
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Add New Product</h1>
      <p class="text-gray-600">Create a new product to add to your inventory</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow p-6">
          <div class="space-y-6">
            <div>
              <label for="name" class="label">Product Name*</label>
              <input
                id="name"
                v-model="formData.name"
                @blur="validateField('name')"
                type="text"
                class="input w-full"
                :class="{ 'border-error-500 focus:ring-error-500': errors.name }"
                placeholder="Enter product name"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-error-600">{{ errors.name }}</p>
            </div>

            <div>
              <label for="description" class="label">Description*</label>
              <textarea
                id="description"
                v-model="formData.description"
                @blur="validateField('description')"
                rows="3"
                class="input w-full"
                :class="{ 'border-error-500 focus:ring-error-500': errors.description }"
                placeholder="Enter product description"
              ></textarea>
              <p v-if="errors.description" class="mt-1 text-sm text-error-600">{{ errors.description }}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="category" class="label">Category*</label>
                <select
                  id="category"
                  v-model="formData.category"
                  @blur="validateField('category')"
                  class="input w-full"
                  :class="{ 'border-error-500 focus:ring-error-500': errors.category }"
                >
                  <option value="" disabled>Select a category</option>
                  <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
                <p v-if="errors.category" class="mt-1 text-sm text-error-600">{{ errors.category }}</p>
              </div>

              <div>
                <label for="price" class="label">Price ($)*</label>
                <input
                  id="price"
                  v-model.number="formData.price"
                  @blur="validateField('price')"
                  type="number"
                  min="0"
                  step="0.01"
                  class="input w-full"
                  :class="{ 'border-error-500 focus:ring-error-500': errors.price }"
                  placeholder="0.00"
                />
                <p v-if="errors.price" class="mt-1 text-sm text-error-600">{{ errors.price }}</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label for="stock" class="label">Initial Stock*</label>
                <input
                  id="stock"
                  v-model.number="formData.stock"
                  @blur="validateField('stock')"
                  type="number"
                  min="0"
                  class="input w-full"
                  :class="{ 'border-error-500 focus:ring-error-500': errors.stock }"
                  placeholder="0"
                />
                <p v-if="errors.stock" class="mt-1 text-sm text-error-600">{{ errors.stock }}</p>
              </div>
              
              <div>
                <label for="threshold" class="label">Low Stock Threshold*</label>
                <input
                  id="threshold"
                  v-model.number="formData.threshold"
                  @blur="validateField('threshold')"
                  type="number"
                  min="0"
                  class="input w-full"
                  :class="{ 'border-error-500 focus:ring-error-500': errors.threshold }"
                  placeholder="0"
                />
                <p v-if="errors.threshold" class="mt-1 text-sm text-error-600">{{ errors.threshold }}</p>
                <p class="mt-1 text-xs text-gray-500">Set the quantity at which you want to receive low stock alerts</p>
              </div>
            </div>
            
            <div>
              <label for="image" class="label">Product Image URL*</label>
              <input
                id="image"
                v-model="formData.image"
                @blur="validateField('image')"
                @input="updatePreview"
                type="url"
                class="input w-full"
                :class="{ 'border-error-500 focus:ring-error-500': errors.image }"
                placeholder="https://example.com/image.jpg"
              />
              <p v-if="errors.image" class="mt-1 text-sm text-error-600">{{ errors.image }}</p>
              <p class="mt-1 text-xs text-gray-500">Enter a URL for the product image</p>
            </div>
            
            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="resetForm"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isSubmitting"
              >
                <i v-if="isSubmitting" class="pi pi-spinner pi-spin mr-2"></i>
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
      
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow p-6 h-full">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Product Preview</h3>
          
          <div v-if="showSuccess" class="bg-success-100 border border-success-200 text-success-800 rounded-md p-4 mb-4">
            <div class="flex">
              <i class="pi pi-check-circle text-success-600 mr-3 text-xl"></i>
              <div>
                <p class="font-medium">Product Added Successfully!</p>
                <p class="text-sm">Redirecting to inventory...</p>
              </div>
            </div>
          </div>
          
          <div v-if="formTouched" class="border rounded-lg overflow-hidden">
            <div v-if="previewImage" class="h-48 overflow-hidden bg-gray-100">
              <img :src="previewImage" :alt="formData.name" class="w-full h-full object-cover">
            </div>
            <div v-else class="h-48 bg-gray-100 flex items-center justify-center">
              <p class="text-gray-400">No image preview available</p>
            </div>
            
            <div class="p-4">
              <h4 class="font-semibold text-gray-800">{{ formData.name || 'Product Name' }}</h4>
              <p class="text-gray-500 text-sm mt-1">{{ formData.category || 'Category' }}</p>
              <p class="font-bold text-primary-600 mt-2">${{ formData.price.toFixed(2) }}</p>
              
              <div class="mt-3 pt-3 border-t border-gray-100">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Stock:</span>
                  <span class="font-medium">{{ formData.stock }}</span>
                </div>
                <div class="flex justify-between mt-1">
                  <span class="text-sm text-gray-600">Low Stock Alert:</span>
                  <span class="font-medium">{{ formData.threshold }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="flex flex-col items-center justify-center h-64 text-center">
            <i class="pi pi-box text-gray-300 text-5xl mb-4"></i>
            <p class="text-gray-500">Fill out the form to see a preview of your product</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>