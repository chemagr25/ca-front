import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    VitePWA({
      workbox: {
        globPatterns: ['**/*.{jpg,png,json,html,js,css,svg,woff2,woff,ttf}'],
        runtimeCaching:[{
          urlPattern: ({url}) =>{
            return url.pathname.startsWith('/api')
          },
          handler: 'CacheFirst',
          options:{
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [0,200]
            }
          }
        }],
      },
    })
  ],
 
})
