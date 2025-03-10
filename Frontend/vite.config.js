import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Redirige las peticiones que comienzan con /api
        target: 'http://localhost:5000', // URL de tu backend
        changeOrigin: true,
      },
    },
  },
});
