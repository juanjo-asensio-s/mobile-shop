import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://itx-frontend-test.onrender.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '/api'),
            }
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.js'
    }
});
