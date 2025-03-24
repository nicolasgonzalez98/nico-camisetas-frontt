<script setup>
    import { computed } from 'vue';
    import { useCartStore } from '@/stores/cartStore';
    import Button from 'primevue/button';
    import Card from 'primevue/card';
    import InputNumber from 'primevue/inputnumber';

    const cartStore = useCartStore();
    const cartItems = computed(() => cartStore.cart);
    const total = computed(() => cartStore.cartTotal);
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Carrito de Compras</h1>
    <div v-if="cartItems.length" class="space-y-4">
      <Card v-for="item in cartItems" :key="item.id" class="p-4 flex justify-between items-center">
        <template #content>
            <div>
                <h2 class="text-lg font-semibold">{{ item.name }}</h2>
                <p class="text-gray-600">${{ item.price }}</p>
            </div>
        </template>
        <template #footer>
            <!-- <div class="flex items-center space-x-2">
                <Button icon="pi pi-minus" @click="cartStore.decreaseQuantity(item.id)" outlined />
                <InputNumber v-model="item.quantity" class="w-16" />
                <Button icon="pi pi-plus" @click="cartStore.increaseQuantity(item.id)" outlined />
                <Button icon="pi pi-trash" @click="cartStore.removeFromCart(item.id)" severity="danger" />
            </div> -->
        </template>
      </Card>
      <div class="text-right text-xl font-bold mt-4">
        Total: ${{ total }}
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      No hay productos en el carrito.
    </div>
  </div>
</template>
