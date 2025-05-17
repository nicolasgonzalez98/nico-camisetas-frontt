<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="max-w-md mx-auto mt-10 p-4 shadow-lg rounded-lg bg-white p-10">
            <h2 class="text-2xl font-bold mb-4">Recuperar contraseña</h2>
        
            <Message v-if="message" severity="success">{{ message }}</Message>
            <Message v-if="error" severity="error">{{ error }}</Message>
        
            <form @submit.prevent="submit">
                <div class="mb-4">
                <label class="block mb-1">Email</label>
                <InputText v-model="email" type="email" class="w-full" required />
                </div>
        
                <Button label="Enviar enlace" icon="pi pi-envelope" class="w-full" :loading="loading" />
            </form>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import InputText from 'primevue/inputtext'
  import Button from 'primevue/button'
  import Message from 'primevue/message'
  import axiosAuth from '@/axiosAuth'
  
  const email = ref('')
  const message = ref('')
  const error = ref('')
  const loading = ref(false)
  
  const submit = async () => {
    loading.value = true
    message.value = ''
    error.value = ''
  
    try {
      const res = await axiosAuth.post('/forgot-password', { email: email.value })
      console.log(res.data)
      message.value = res.data.message
    } catch (err) {
      error.value = err.response?.data?.message || 'Ocurrió un error'
    } finally {
      loading.value = false
    }
  }
  </script>
  
  