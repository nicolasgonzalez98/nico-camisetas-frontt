import { defineStore } from 'pinia'
import axiosAuth from 'axios'

export const useOrdersStore = defineStore('orders', {
    state: () => ({
      orders: [],
      loading: false,
    }),
    actions: {
        async fetchOrders() {
            this.loading = true
            
            try {
                const res = await axiosAuth.get('/api/orders')
                this.orders = res.data
            } catch (error) {
                console.error('Error al obtener órdenes:', error)
            } finally {
                this.loading = false
            }
        }
        }
})