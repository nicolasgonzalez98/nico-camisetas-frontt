<template>
    <div class="max-w-md mx-auto mt-10 p-4 shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Reestablecer contraseña</h2>
  
      <Message v-if="message" severity="success">{{ message }}</Message>
      <Message v-if="error" severity="error">{{ error }}</Message>
  
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label class="block mb-1">Nueva contraseña</label>
          <Password v-model="password" class="w-full" toggleMask />
        </div>
  
        <div class="mb-4">
          <label class="block mb-1">Confirmar contraseña</label>
          <Password v-model="confirmPassword" class="w-full" toggleMask />
        </div>
  
        <Button label="Actualizar contraseña" icon="pi pi-refresh" class="w-full" :loading="loading" />
      </form>
    </div>
</template>
  
  <script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import axios from 'axios'
    import Password from 'primevue/password'
    import Button from 'primevue/button'
    import Message from 'primevue/message'
    
    const route = useRoute()
    const email = ref('')
    const token = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const message = ref('')
    const error = ref('')
    const loading = ref(false)
    
    onMounted(() => {
        email.value = route.query.email || ''
        token.value = route.query.token || ''
    })
    
    const submit = async () => {
        loading.value = true
        message.value = ''
        error.value = ''
    
        try {
        const res = await axios.post('/api/reset-password', {
            email: email.value,
            token: token.value,
            password: password.value,
            password_confirmation: confirmPassword.value
        })
    
        message.value = res.data.message
        } catch (err) {
        error.value = err.response?.data?.message || 'Ocurrió un error'
        } finally {
        loading.value = false
        }
    }
  </script>
  
  