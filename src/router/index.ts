import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Demo from '../views/demo/demo.vue';
import Home from '../views/home/home.vue';
import SignIn from '../views/sign-in/sign-in.vue';
import About from '../views/about/about.vue';
import Cart from '../views/cart/cart.vue';
import { RoutingPaths } from './routing-paths';

const routes: Array<RouteRecordRaw> = [
    {
        path:RoutingPaths.Home,
        name:"Home",
        component: Home
    },
    {
        path: RoutingPaths.About,
        name: 'About',
        component: About
    },
    {
        path:RoutingPaths.Demo,
        name: 'Demo',
        component: Demo
    },
    {
        path:RoutingPaths.SignIn,
        name: 'SignIn',
        component: SignIn
    },
    {
        path:RoutingPaths.Cart,
        name: 'Cart',
        component: Cart
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes,
});

export default router;