import axios from 'axios'
import { MessagePlugin } from 'tdesign-vue-next'

const service = axios.create({
	timeout: 30000, // 请求超时时间
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
	},
})

// 请求拦截
service.interceptors.request.use(
	(config) => {
		const token = sessionStorage.getItem('token')
		token && (config.headers.authorization = `Bearer ${token}`)
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

/** 添加响应拦截器  * */
service.interceptors.response.use(
	(response) => {
		const { data, status, config } = response
		if (config.headers.responseType === 'blob') return data
		if (status === 200) {
			const { code, message } = data
			if (code === 200) {
				return data
			} else {
				MessagePlugin.closeAll()
				MessagePlugin.error(message)
				return Promise.reject(message)
			}
		}
	},
	(error) => {
		if (!error.response) return Promise.reject(error)
		const { data, status } = error.response
		return Promise.reject({ data, status })
	}
)

export default service
