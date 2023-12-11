import service from './http'

// 例子
export const queryListApi = (data, signal) => {
	return service.post('/fox/test', data, {
		...signal,
		// responseType: 'blob', // 流文件
		headers: {
			// 'Content-type': 'multipart/form-data', // 上传文件
		},
	})
}

// test get 请求
export const queryGetApi = (params, signal) => {
	return service.get('/fox/get', {
		params,
		...signal,
		// responseType: 'blob', // 流文件
		headers: {
			// 'Content-type': 'multipart/form-data', // 上传文件
		},
	})
}
