export const routes = [
	{
		path: '/',
		redirect: '/home',
	},
	{
		path: '/index',
		children: [
			{
				path: '',
				name: 'index',
				meta: { title: 'index' },
				component: () => import('@/views/index.vue'),
			},
		],
	},
	{
		path: '/home',
		children: [
			{
				path: '',
				name: 'home',
				meta: { title: 'home' },
				component: () => import('@/views/Home/index.vue'),
			},
		],
	},
]
