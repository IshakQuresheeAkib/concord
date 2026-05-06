import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
             if (id.includes('lottie')) return 'vendor-lottie';
             if (id.includes('antd') || id.includes('@ant-design')) return 'vendor-antd';
             if (id.includes('firebase')) return 'vendor-firebase';
             if (id.includes('@stripe')) return 'vendor-stripe';
             if (id.includes('framer-motion')) return 'vendor-framer-motion';
             if (id.includes('recharts')) return 'vendor-recharts';
          }
        }
      }
    }
  }
})