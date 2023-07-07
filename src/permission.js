import router from './router'

// 路由进入之前
router.beforeEach((to, _, next) => {
	next()
})
