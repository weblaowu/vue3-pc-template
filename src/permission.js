import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'

NProgress.configure({
	showSpinner: false, // 是否显示加载ico
})

// 路由进入之前
router.beforeEach((to, _, next) => {
	NProgress.start()
	const { token } = to.query
	token && sessionStorage.setItem('token', token)
	next()
})

router.afterEach(() => {
	NProgress.done()
})
