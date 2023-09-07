import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './baseRoutes'

const baseUrl = import.meta.env.VITE_APP_BASE_URL

const router = createRouter({
	history: createWebHistory(baseUrl),
	routes,
})

export default router
