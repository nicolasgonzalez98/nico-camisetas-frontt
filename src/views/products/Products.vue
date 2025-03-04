<script setup>
    import { onMounted } from "vue";
    import { useProductStore } from "../../stores/productStore";
    import { useRouter } from "vue-router";

    const productStore = useProductStore();

    const router = useRouter();

    onMounted(() => {
        productStore.fetchProducts(); // Cargar productos al montar el componente
    });

    const editProduct = (id) => {
        router.push(`/admin/edit-product/${id}`); // Redirigir a la vista de edición
    };

    const deleteProduct = (id) => {
        productStore.deleteProduct(id);
    };
</script>

<template>
        <div class="container mx-auto">
            <h1 class="text-2xl font-bold mb-4">Lista de Productos</h1>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                v-for="product in productStore.products"
                :key="product.id"
                class="border p-4 rounded-lg shadow-md"
                >
                <h2 class="text-lg font-semibold">{{ product.name }}</h2>
                <p class="text-gray-700">{{ product.description }}</p>
                <p class="text-green-600 font-bold">${{ product.price }}</p>
                <p>Stock: {{ product.stock }}</p>
                <div class="mt-2 flex gap-2">
                    <button @click="editProduct(product.id)" class="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer">
                    Editar
                    </button>
                    <button @click="deleteProduct(product.id)" class="px-3 py-1 bg-red-500 text-white rounded cursor-pointer">
                    Eliminar
                    </button>
                </div>
                </div>
            </div>
        </div>
  </template>