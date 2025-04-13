import { defineStore } from 'pinia'
import axiosAuth from '@/axiosAuth'

export const useOrdersStore = defineStore('orders', {
    state: () => ({
      orders: [],
      loading: false,
    }),
    actions: {
        async fetchOrders() {
            this.loading = true
            
            try {
                const res = await axiosAuth.get('/orders')
                console.log('Respuesta del backend:', res.data)
                this.orders = res.data
            } catch (error) {
                console.error('Error al obtener órdenes:', error)
            } finally {
                this.loading = false
            }
        },
        async confirmOrder(orderId) {
            try {
              await axiosAuth.post(`/orders/${orderId}/confirm`)
              const order = this.orders.find(o => o.id === orderId)
              if (order) {
                order.status = 'confirmed'
              }
            } catch (error) {
              console.error('Error al confirmar la orden:', error)
            }
          }          
        }
})