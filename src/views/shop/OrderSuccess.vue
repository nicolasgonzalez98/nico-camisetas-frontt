<template>
    <div class="max-w-2xl mx-auto text-center py-16 px-4">
      <h1 class="text-3xl font-bold text-green-600 mb-4">¡Gracias por tu compra!</h1>
      <p class="mb-6 text-lg">Tu pedido fue procesado correctamente.</p>
  
      <div v-if="lastOrder" class="bg-gray-100 p-6 rounded shadow">
        <h2 class="text-xl font-semibold mb-2">Resumen del pedido</h2>
        <p><strong>Nombre:</strong> {{ lastOrder.name }}</p>
        <p><strong>Email:</strong> {{ lastOrder.email }}</p>
        <p><strong>Dirección:</strong> {{ lastOrder.address }}</p>
        <p><strong>Total:</strong> ${{ lastOrder.total }}</p>
  
        <ul class="mt-4 text-left">
          <li v-for="item in lastOrder.items" :key="item.product_id">
            {{ item.name }} (x{{ item.quantity }})
          </li>
        </ul>
      </div>
  
      <RouterLink to="/" class="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Volver al inicio
      </RouterLink>
    </div>
  </template>
  
  <script setup>
    import { useRoute } from 'vue-router'
    import { computed } from 'vue'
    
    const route = useRoute()
    const lastOrder = computed(() => route.query && route.query.order ? JSON.parse(route.query.order) : null)
  </script>
  