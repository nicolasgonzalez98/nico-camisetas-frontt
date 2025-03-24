import { defineStore } from 'pinia';
import axiosAuth from "../axiosAuth.js";
import axios from "axios";


export const useCartStore = defineStore("cart", {
    state: () => ({
        cart: JSON.parse(localStorage.getItem("cart")) || [],
        cartErrors: null,
    }),

    getters: {
        getCart: (state) => state.cart,
        cartTotal: (state) =>
          state.cart.reduce((total, product) => total + product.price * product.quantity, 0),
    },
    actions: {
        addToCart(product) {
          try {
            const existingProduct = this.cart.find((p) => p.id === product.id);
            if (existingProduct) {
              existingProduct.quantity++;
            } else {
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
      },
})