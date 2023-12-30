// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': {
        target: `http://localhost:${process.env.RUNNING_PORT}`
      }
    }
  }
});
