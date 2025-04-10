import { defineStore } from 'pinia';
import axiosAuth from "../axiosAuth.js";
import axios from "axios";


export const useCartStore = defineStore("cart", {
    state: () => ({
        cart: JSON.parse(localStorage.getItem("cart")) || [],
        cartErrors: null,
        total: 0,
    }),

    getters: {
        getCart: (state) => state.cart,
        cartTotal: (state) => {
          return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        totalItems: (state) => {
          return state.cart.length;
        }
    },
    actions: {
        addToCart(product) {
          try {
            const existingProduct = this.cart.find((p) => p.id === product.id);
            if (!existingProduct) {
              this.cart.push({ ...product, quantity: 1 });
            }
            this.saveCart();
          } catch (error) {
            this.cartErrors = "Error al agregar el producto al carrito";
            console.error(error);
          }
        },
    
        removeFromCart(productId) {
          this.cart = this.cart.filter((p) => p.id !== productId);
          this.saveCart();
        },
    
        clearCart() {
          this.cart = [];
          this.saveCart();
        },
    
        saveCart() {
          localStorage.setItem("cart", JSON.stringify(this.cart));
        },
        async checkout(orderData) {
            console.log(orderData)
      
            try {
              const payload = {
                name: orderData.name,
                email: orderData.email,
                address: orderData.address,
                items: this.cart.map(item => ({
                  product_id: item.id,
                  quantity: item.quantity,
                })),
                total: this.total
              }
              
              const response = await axiosAuth.post('/orders', payload)
      
              // Vaciar carrito después del checkout exitoso
              this.cartItems = []
              this.total = 0
      
              
      
              return response.data
      
            } catch (error) {
              console.log(error)
              
              throw error
            }
          }
      },
})