import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vue()],
    define: {
      __APP_ENV__: process.env.VITE_VERCEL_ENV,
    },
  };
});
