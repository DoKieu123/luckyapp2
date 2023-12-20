import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import OrderView from "../views/OrderView.vue"
import ProductView from "../views/ProductView.vue"
import NewProduct from "../views/NewProduct.vue"
import ClientView from "../views/ClientView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/order",
    name: "order",
    component:OrderView
  },
  {
    path: "/product",
    name: "product",
    component:ProductView
  },
  {
    path: "/newproduct",
    name: "newproduct",
    component:NewProduct
  },
  {
    path: "/client",
    name: "client",
    component:ClientView
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
