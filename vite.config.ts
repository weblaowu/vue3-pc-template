import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
	base: '/',
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
		drop: ['console', 'debugger'],
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
	],
	optimizeDeps: {
		include: ['lodash-es'],
	},
})
