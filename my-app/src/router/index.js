import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import CatalogView from "@/views/CatalogView.vue";
import CartView from "@/views/CartView.vue";
import OrdersView from "@/views/OrdersView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: function () {
      return import('../views/HomeView.vue');
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/login",
    name: "Login",
    component: function () {
      return import('../views/LoginView.vue');
    },
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/catalog",
    component: MainLayout,
    children: [{ path: "", component: CatalogView }]
  },
  {
    path: "/cart",
    component: MainLayout,
    children: [{ path: "", component: CartView }]
  },
  {
    path: "/orders",
    component: MainLayout,
    children: [{ path: "", component: OrdersView }]
  },
  {
    path: "/login",
    component: AuthLayout,
    children: [{ path: "", component: LoginView }]
  },
  {
    path: "/register",
    component: AuthLayout,
    children: [{ path: "", component: RegisterView }]
  },
  { path: "/", redirect: "/catalog" }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
