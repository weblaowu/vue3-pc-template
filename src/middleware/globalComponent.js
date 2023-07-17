import FormWrap from '@components/FormWrap/index.vue'
import SearchWrap from '@components/SearchWrap/index.vue'
import SecondWrap from '@components/SecondWrap/index.vue'

const Components = {
	FormWrap,
	SearchWrap,
	SecondWrap,
}

export const registerGlobalComponents = (app) => {
	Object.keys(Components).forEach((comp) => {
		app.component(comp, Components[comp])
	})
}
