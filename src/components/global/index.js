const modules = import.meta.glob('../global/*/*.vue')

// 注册全局组件
const globalComp = {
	install: (app) => {
		for (let path in modules) {
			modules[path]().then((comp) => {
				app.component(comp['default']['name'], comp['default'])
			})
		}
	},
}

export default globalComp
