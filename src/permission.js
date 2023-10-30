import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'

NProgress.configure({
	showSpinner: false, // 是否显示加载ico
})

// 路由进入之前
router.beforeEach((to, _, next) => {
	NProgress.start()
	next()
})

router.afterEach(() => {
	NProgress.done()
})
