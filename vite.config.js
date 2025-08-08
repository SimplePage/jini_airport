import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/jini_airport/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'src/assets/plane.png'],
      manifest: {
        name: 'Jini Airport',
        short_name: 'Airport',
        description: '공항 체크인 키오스크 PWA',
        theme_color: '#1976d2',
        background_color: '#87cefa',
        display: 'standalone',
        start_url: '/jini_airport/',
        icons: [
          {
            src: 'plane.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'plane.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
