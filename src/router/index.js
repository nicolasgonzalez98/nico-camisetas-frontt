import {createRouter, createWebHistory} from "vue-router";
import routesAuth from './authRouter.js'
import routesShop from './shopRouter.js'
import routesAdmin from './adminRouter.js'
import productsRouter from "./productsRouter.js";

var allRoutes = []

const routes = allRoutes.concat(routesAuth, routesShop, routesAdmin, productsRouter)


const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
