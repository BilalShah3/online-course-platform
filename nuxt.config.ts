// https://nuxt.com/docs/api/configuration/nuxt-config
import vsharp from 'vite-plugin-vsharp'
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
		stripeSecret: '',
    stripeWebhookSecret: '',
		public: {
			stripeKey: '',
		},
	},
   vite: {
    plugins: [vsharp()],
  },
  nitro: {
    prerender: {
      routes: ['/landing']
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    'nuxt-snackbar',
  ],
  snackbar: {
    bottom: true,
    right: true,
    duration: 5000,
    shadow:true
  },
})
