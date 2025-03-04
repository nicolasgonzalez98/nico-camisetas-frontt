import { userAuthStore } from "@/stores/authStore";
import AdminPanel from "@/views/admin/AdminPanel.vue";
import ProductForm from "@/views/products/ProductForm.vue";

export default [
    {
        path: "/admin",
        name: "AdminPanel",
        component: AdminPanel,
        beforeEnter: (to, from, next) => {
            const authStore = userAuthStore();
            if (!authStore.isAdmin) {
                next("/"); // Si no es admin, lo redirige al dashboard
            } else {
                next();
            }
        }
    },
    { path: "/admin/add-product", component: ProductForm },
    { path: "/admin/edit-product/:id", component: ProductForm, props: true }
]