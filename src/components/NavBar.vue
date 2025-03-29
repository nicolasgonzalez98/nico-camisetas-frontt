<script setup>
    import { useRouter } from "vue-router";
    import { userAuthStore } from "../stores/authStore";
    import { computed, ref } from "vue";
import { useCartStore } from "@/stores/cartStore";

    const router = useRouter();
    const authStore = userAuthStore();
    const isMenuOpen = ref(false);

    const cartStore = useCartStore();
    const cartItemCount = computed(() => cartStore.totalItems);

    const logOut = async () => {
      
      try {
        await authStore.logOut();
        router.push('/login');
      } catch (error) {
        console.error('Error en el registro:', error);
      }
    };
    
</script>

<template>
    <nav class="bg-[#556B2F] text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2">
            <img src="/src/assets/nico_camisetas.png" alt="Logo" class="w-8 h-8" />
            <span class="text-xl font-bold">Nico Camisetas</span> 
        </router-link>
  
        <!-- Menú -->
        <div class="flex items-center gap-6">
          <router-link to="/" class="hover:underline">Inicio</router-link>
  
          <!-- Solo para admins -->
          <router-link v-if="authStore.isAdmin" to="/admin" class="hover:underline">
            Panel de Admin
          </router-link>

          <router-link to="/mi-carrito" class="relative">
            <i class="pi pi-shopping-cart" style="font-size: 1.5rem;"></i>
            <span v-if="cartItemCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {{ cartItemCount }}
            </span>
          </router-link>
  
          <button @click="logOut" class="hover:underline cursor-pointer">Cerrar Sesión</button>
        </div>
      </div>
    </nav>
  </template>

  <style scoped>
    .relative {
      position: relative;
    }
    .absolute {
      position: absolute;
    }
  </style>