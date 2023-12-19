import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Principal from "../views/Principal.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/app",
      name: "app",
      component: Principal,
    },
  ],
});

export default router;
