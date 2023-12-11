import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './baseRoutes'

const baseUrl = import.meta.env.VITE_PUBLIC_PATH

const router = createRouter({
	history: createWebHistory(baseUrl),
	routes,
})

export default router
