import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with /api to your backend server
      '/api': {
        target: 'http://localhost:3002', // Your backend API URL
        changeOrigin: true, // Needed for virtual hosted sites
        // secure: false,      // Uncomment if backend runs on HTTPS with self-signed cert
        // rewrite: (path) => path.replace(/^\/api/, '') // Uncomment if you want to remove /api prefix before forwarding
      }
      // You can add more proxies here if needed
    },
    // Optional: Define the port for the dev server if not default 5173
    // port: 5173 
  }
})
