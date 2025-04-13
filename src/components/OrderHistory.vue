<template>
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Historial de pedidos</h2>
  
      <ProgressSpinner v-if="ordersStore.loading" />
  
      <div v-else-if="ordersStore.orders.length === 0">
        <p>No tenés pedidos todavía.</p>
      </div>
  
      <div v-else>
        <Accordion :activeIndex="0">
          <AccordionTab v-for="order in ordersStore.orders" :key="order.id" :header="`Pedido #${order.id} - ${formatDate(order.created_at)} - Estado: ${order.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}`"          >
            <ul class="space-y-2">
              <li v-for="product in order.products" :key="product.id" class="border-b pb-2">
                <div class="flex justify-between">
                  <span>{{ product.name }}</span>
                  <span>${{ product.price }}</span>
                </div>
              </li>
            </ul>
            <div class="mt-2 text-right font-semibold">
              Total: ${{ order.total }}
            </div>

            <div class="mt-4 text-right">
              <Button
                :label="order.status === 'confirmed' ? 'Orden confirmada' : 'Confirmar orden'"
                :icon="order.status === 'confirmed' ? 'pi pi-check-circle' : 'pi pi-check'"
                :class="order.status === 'confirmed' ? 'p-button-secondary' : 'p-button-success'"
                :disabled="order.status === 'confirmed'"
                @click="confirmOrder(order.id)"
              />
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  </template>
  
  <script setup>
    import { onMounted } from 'vue'
    import { useOrdersStore } from '@/stores/ordersStore'
    import ProgressSpinner from 'primevue/progressspinner'
    import Accordion from 'primevue/accordion'
    import AccordionTab from 'primevue/accordiontab'
    import Button from 'primevue/button'
    
    const ordersStore = useOrdersStore()
    
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString()
    }
    
    onMounted(async () => {
        await ordersStore.fetchOrders()
        console.log(ordersStore.orders)
    })

    const confirmOrder = async (orderId) => {
      try {
        await ordersStore.confirmOrder(orderId)
      } catch (error) {
        console.error('Error al confirmar la orden:', error)
      }
    }
  </script>
  