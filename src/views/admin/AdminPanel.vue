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

    <!-- Agregar productos, ver historial de ordenes. -->
    <div class="flex gap-4 mb-4">
      <Button label="Agregar Producto" class="p-button-success" @click="router.push('/admin/add-product')" />
      <Button label="Ver Historial de Pedidos" class="p-button-info" @click="router.push('/admin/order-historial')" />
    </div>

    <!-- Lista de Productos -->
    <Products />
  </div>
</template>
