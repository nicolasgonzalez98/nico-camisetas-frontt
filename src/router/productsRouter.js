import { userAuthStore } from "@/stores/authStore";
import Products from "@/views/products/Products.vue";

export default [
    {
        path: "/productos",
        name: "Productos",
        component: Products,
        // beforeEnter: (to, from, next) => {
        //     const authStore = userAuthStore();
        //     if (!authStore.isAdmin) {
        //         next("/"); // Si no es admin, lo redirige al dashboard
        //     } else {
        //         next();
        //     }
        // }
    }
]