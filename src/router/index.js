import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./baseRoutes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
