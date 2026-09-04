import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'

// Two complementary hues (indigo ~243° / amber ~63°) used for all gradients and accents.
const vuetify = createVuetify({
	blueprint: md3,
	theme: {
		defaultTheme: 'light',
		themes: {
			light: {
				colors: {
					primary: '#4F46E5',
					secondary: '#E5A346',
					surface: '#FBFAFF',
					background: '#F3F1FC',
				},
			},
			dark: {
				colors: {
					primary: '#8B82F0',
					secondary: '#F0C078',
					surface: '#1D1B2C',
					background: '#151422',
				},
			},
		},
	},
	components,
	directives,
})

createApp(App).use(router).use(vuetify).mount('#app')
