import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ mode }) => {
	// vite 中获取环境变量
	const isProduct = mode === 'production'
	const baseUrl = loadEnv(mode, process.cwd()).VITE_APP_BASE_URL
	return {
		base: baseUrl,
		server: {
			host: '0.0.0.0',
			port: 8080,
			open: false,
			https: false,
			proxy: {
				'/api': {
					target: 'http://xxx',
					changeOrigin: true,
					rewrite: (path: string) => path.replace(/^\/api/, ''),
				},
			},
		},
		esbuild: {
			drop: isProduct ? ['console', 'debugger'] : [],
		},
		build: {
			minify: 'esbuild',
			chunkSizeWarningLimit: 500,
			rollupOptions: {
				output: {
					manualChunks: {
						'vue-vendor': ['vue', 'vue-router', 'pinia'],
						't-ui': ['tdesign-vue-next'],
					},
				},
			},
		},
		resolve: {
			// 配置别名
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@api': path.resolve(__dirname, 'src/api'),
				'@components': path.resolve(__dirname, 'src/components'),
				'@utils': path.resolve(__dirname, 'src/utils'),
				'@store': path.resolve(__dirname, 'src/store'),
				'@assets': path.resolve(__dirname, 'src/assets'),
				'@use': path.resolve(__dirname, 'src/use'),
				'@middleware': path.resolve(__dirname, 'src/middleware'),
			},
		},
		css: {
			// 配置引入全局变量
			preprocessorOptions: {
				scss: {
					additionalData: '@import "@/assets/styles/main.scss";',
				},
			},
		},
		plugins: [
			vue(),
			vueJsx(),
			Components({
				resolvers: [
					TDesignResolver({
						library: 'vue-next',
					}),
				],
			}),
			AutoImport({
				resolvers: [
					TDesignResolver({
						library: 'vue-next',
					}),
				],
				imports: ['vue', 'vue-router'],
			}),
			legacy({
				// 设置目标浏览器，browserslist 配置语法
				targets: ['chrome >=80'],
			}),
			/* 开启mock配置 */
			// viteMockServe({
			// 	// localEnabled: true, // 此处可以手动设置为true，也可以根据官方文档格式
			// 	mockPath: './src/mock/',
			// 	logger: true,
			// }),
		],
		optimizeDeps: {
			include: ['lodash-es'],
		},
	}
})
