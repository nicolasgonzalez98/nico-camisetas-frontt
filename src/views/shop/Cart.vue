<script setup>
    import { computed } from 'vue';
    import { useCartStore } from '@/stores/cartStore';
    import Button from 'primevue/button';
    import Card from 'primevue/card';
    import { useRouter } from 'vue-router';
  

    const cartStore = useCartStore();
    const router = useRouter();
    const cartItems = computed(() => cartStore.cart);
    const total = computed(() => cartStore.cartTotal);

    const goToCheckout = () => {
      router.push('/checkout');
    };
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Carrito de Compras</h1>
    <div v-if="cartItems.length" class="space-y-4">
      <Card v-for="item in cartItems" :key="item.id" class="p-4 flex justify-between items-center">
        <template #content>
            <div>
                <h2 class="text-lg font-semibold">{{ item.name }}</h2>
                <p class="text-gray-600">${{ parseFloat(item.price) }}</p>
            </div>
        </template>
        <template #footer>
            <div class="flex items-center space-x-2">
                <Button icon="pi pi-trash" @click="cartStore.removeFromCart(item.id)" severity="danger" />
            </div>
        </template>
      </Card>
      <div class="text-right text-xl font-bold mt-4">
        Total: ${{ total }}
      </div>

      <button 
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        @click="goToCheckout"
      >
        Proceder al Pago
      </button>
    </div>
    <div v-else class="text-center text-gray-500">
      No hay productos en el carrito.
    </div>
  </div>
</template>
