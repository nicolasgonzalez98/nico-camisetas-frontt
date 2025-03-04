<script setup>
import { userAuthStore } from '@/stores/authStore';
import Products from '../products/Products.vue';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = userAuthStore();
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Panel de Administración</h1>

    <!-- Agregar productos -->
    <div class="mb-4">
      <Button label="Agregar Producto" class="p-button-success" @click="router.push('/admin/add-product')" />
    </div>

    <!-- Lista de Productos -->
    <Products />
  </div>
</template>
