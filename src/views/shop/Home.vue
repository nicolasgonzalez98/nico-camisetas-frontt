<script setup>

    import { userAuthStore } from '@/stores/authStore';
    import Button from 'primevue/button';
    import { useRouter } from 'vue-router';
    import NavBar from '../../components/NavBar.vue'
    import { ref, computed, onMounted } from 'vue';
    import axios from 'axios';
    import InputText from 'primevue/inputtext';
    import Card from 'primevue/card';
    import { useProductStore } from '@/stores/productStore';
    import { useCartStore } from "@/stores/cartStore";
    import { useToast } from 'primevue/usetoast';
    import Toast from "primevue/toast";
    //import { Button } from 'primevue/button';

    const router = useRouter()
    const authStore = userAuthStore()
    const productStore = useProductStore()

    //Carrito Store
    const cartStore = useCartStore()

    //Notificaciones
    const toast = useToast();

    const logOut = async () => {
        try {
          await authStore.logOut();
          router.push('/login');
        } catch (error) {
          console.error('Error en el registro:', error);
        }
    };

    const products = ref([]);
    const searchQuery = ref('');
    const loading = ref(false)

    onMounted(async () => {
      console.log("HOLA")
      loading.value = true
      console.log(authStore.authToken)
      if (authStore.authToken) {
        console.log("HOLA!!!")
        await productStore.fetchProducts()
        .then(() => {
          products.value = productStore.products
          loading.value = false
        });
        
      }
      
    });

  // Filtrar productos por búsqueda
      const filteredProducts = computed(() => {
        return products.value.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });

  //Agregar productos al carrito

    const addToCart = (product) => {
      console.log(product)
      cartStore.addToCart(product);
      toast.add({ severity: "success", summary: "Producto agregado", detail: `${product.name} fue añadido al carrito`, life: 3000 });
    };

</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold text-center mb-6">Tienda</h1>
    
    <!-- Barra de búsqueda -->
    <InputText v-model="searchQuery" placeholder="Buscar productos..." class="w-full mb-6 p-2 border rounded" />
    <div v-if="loading">Cargando...</div>
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
    
      <Card v-for="product in filteredProducts" :key="product.id" class="shadow-md rounded-lg p-1 transition-all hover:shadow-lg hover:scale-105 duration-300">
        
       <template #header>
          <img v-if="product.images?.length" :src="product.images[0]" class="w-full h-100 object-cover rounded-t m-auto mb-4" loading="lazy"/>
        </template>
        <template #title>
          <h2 class="text-xl font-semibold text-gray-800">{{ product.name }}</h2>
        </template>
        
        <template #content>
          <p class="text-gray-600">{{ product.description }}</p>
          <p class="text-lg font-bold text-green-600">${{ product.price }}</p>
        </template>
        <template #footer>
          <Button
            @click="addToCart(product)"
            label="Agregar al carrito" 
            class="mt-4 w-full py-2 px-4 rounded-md  transition-all"
            severity="help"
          />
        </template>

        
      </Card>

      <Toast />
    </div>
  </div>
</template>

<style scoped>
  .container {
    max-width: 1200px;
  }
</style>