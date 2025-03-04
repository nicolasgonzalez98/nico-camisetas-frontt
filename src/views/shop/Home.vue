<script setup>

import { userAuthStore } from '@/stores/authStore';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import NavBar from '../../components/NavBar.vue'

const router = useRouter()
const authStore = userAuthStore()

const logOut = async () => {
    try {
      await authStore.logOut();
      router.push('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

</script>

<template>
    

    <div class="container mx-auto mt-10">
      <h1 class="text-2xl font-bold">Bienvenido a nuestro E-Commerce</h1>
    </div>
</template>