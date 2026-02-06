import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 프론트에서 /api로 시작하는 요청은 백엔드 서버로 프록시
      '/api': {
        target: 'http://34.64.188.189:4000',
        changeOrigin: true,
      },
    },
  },
})
