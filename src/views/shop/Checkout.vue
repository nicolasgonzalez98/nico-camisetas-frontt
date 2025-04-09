<script setup>
    import { ref, computed } from 'vue';
    import { useCartStore } from '@/stores/cartStore';
    import { useRouter } from 'vue-router';
    import { useToast } from 'primevue/usetoast';
    import Toast from "primevue/toast";
    import * as yup from "yup";

    const cartStore = useCartStore();
    const router = useRouter();

    const toast = useToast();

    const cartItems = cartStore.cart;

    const form = ref({
        name: '',
        address: '',
        email: '',
    });

    const errors = ref({});
    const showSummary = ref(false);

    const totalPrice = computed(() => {
        return cartStore.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });

    const schema = yup.object().shape({
        name: yup.string().required("El nombre es obligatorio"),
        email: yup.string().email("Debe ser un email válido").required("El email es obligatorio"),
        address: yup.string().required("La dirección es obligatoria").min(5, "Debe tener al menos 5 caracteres"),
    });

    const submitCheckout = async () => {
        try {
            await schema.validate(form.value, { abortEarly: false })
            
            // Limpiar errores anteriores
            errors.value.name = ''
            errors.value.email = ''
            errors.value.address = ''

            showSummary.value = true
        } catch (err) {
            if(err.name === 'ValidationError') {
                err.inner.forEach((e) => {
                    errors.value[e.path] = e.message
                })
            }else {
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al validar el formulario',
                    life: 3000,
                })
            }
        }
    }

    const confirmOrder = async () => {
        try {
            
            await cartStore.checkout({ ...form.value })

            toast.add({
                severity: 'success',
                summary: 'Compra realizada',
                detail: 'Gracias por tu pedido!',
                life: 3000,
            })

            showSummary.value = false

            const orderSummary = {
                name: form.value.name,
                email: form.value.email,
                address: form.value.address,
                total: totalPrice.value,
                items: cartStore.cart.map(item => ({
                    product_id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                }))
            };

        // Vaciamos el carrito
            cartStore.clearCart();

        // Redirigimos a la vista de éxito
            router.push({
                name: 'OrderSuccess',
                query: {
                    order: JSON.stringify(orderSummary)
                }
            });
        } catch (err) {
            console.log(err)
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo procesar el pedido'+err,
                life: 3000,
            })
        }
    }

    
</script>

<template>
    <div class="max-w-3xl mx-auto p-6">
        <Toast />
        <h1 class="text-2xl font-bold mb-4">Finalizar Compra</h1>
        <!-- Lista de productos a comprar -->
        <div v-if="cartItems.length > 0">
            <div v-for="item in cartItems" :key="item.id" class="flex justify-between mb-2">
                <span>{{ item.name }} (x{{ item.quantity }})</span>
                <span class="font-bold">${{ item.price * item.quantity }}</span>
            </div>
        <div class="font-bold text-lg mt-4">Total: ${{ totalPrice }}</div>

        <!-- Formulario de checkout -->
        <form @submit.prevent="submitCheckout" class="space-y-4 max-w-md mx-auto">
            <div>
                <label for="name" class="block text-sm font-medium">Nombre</label>
                <input v-model="form.name" type="text" id="name" class="border p-2 w-full rounded" />
                <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
            </div>

            <div>
                <label for="email" class="block text-sm font-medium">Email</label>
                <input v-model="form.email" type="email" id="email" class="border p-2 w-full rounded" />
                <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
            </div>

            <div>
                <label for="address" class="block text-sm font-medium">Dirección</label>
                <input v-model="form.address" type="text" id="address" class="border p-2 w-full rounded" />
                <span v-if="errors.address" class="text-red-500 text-sm">{{ errors.address }}</span>
            </div>

            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Confirmar Compra</button>
        </form>
        </div>
        <p v-else class="text-center text-gray-500">No hay productos en el carrito.</p>
        
        <!-- Compra finalizada -->
        <div v-if="showSummary" class="max-w-md mx-auto p-4 mt-6 border rounded shadow">
            <h2 class="text-lg font-bold mb-2">Resumen del Pedido</h2>
            <p><strong>Nombre:</strong> {{ form.name }}</p>
            <p><strong>Email:</strong> {{ form.email }}</p>
            <p><strong>Dirección:</strong> {{ form.address }}</p>

            <h3 class="text-md font-semibold mt-4">Productos:</h3>
            <ul>
                <li v-for="item in cartItems" :key="item.id">{{ item.name }} - {{ item.quantity }}</li>
            </ul>

            <button @click="confirmOrder" class="bg-green-500 text-white px-4 py-2 rounded w-full mt-4 cursor-pointer">Confirmar Pedido</button>
        </div>
    </div>
</template>