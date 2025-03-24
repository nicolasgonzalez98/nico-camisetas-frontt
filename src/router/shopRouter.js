import Cart from "@/views/shop/Cart.vue";
import Home from "@/views/shop/Home.vue";

export default [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/mi-carrito",
        name:"Cart",
        component: Cart
    }
];