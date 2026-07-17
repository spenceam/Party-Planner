import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'

const vuetify = createVuetify({
	theme: {
		defaultTheme: 'light',
		themes: {
			light: {
				colors: {
					primary: '#2e7d32',
					secondary: '#26a69a',
					accent: '#81c784',
					surface: '#f4fbf6',
					background: '#eef7f0',
				},
			},
			dark: {
				colors: {
					primary: '#66bb6a',
					secondary: '#4db6ac',
					accent: '#a5d6a7',
					surface: '#1f2b22',
					background: '#16201a',
				},
			},
		},
	},
	components,
	directives,
})

createApp(App).use(router).use(vuetify).mount('#app')
