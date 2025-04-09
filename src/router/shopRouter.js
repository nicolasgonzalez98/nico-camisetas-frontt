import Cart from "@/views/shop/Cart.vue";
import Checkout from "@/views/shop/Checkout.vue";
import Home from "@/views/shop/Home.vue";
import OrderSuccess from "@/views/shop/OrderSuccess.vue";

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
    },
    {
        path: "/checkout",
        name: "Checkout",
        component: Checkout
    },
    {
        path: '/order-success',
        name: 'OrderSuccess',
        component: OrderSuccess,
    }
];