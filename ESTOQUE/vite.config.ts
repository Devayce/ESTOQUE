/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const cfg = {
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    globals: true,
    environment: "node",
  },
} as any;

export default defineConfig(cfg);
