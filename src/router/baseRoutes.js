export const routes = [
	{
		path: '/',
		redirect: '/home',
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
