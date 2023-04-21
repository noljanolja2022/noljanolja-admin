import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // sourcemap: true,
    outDir: 'build',
  },
  // resolve: {
  //   alias: [
  //     {
  //       find: '@', // @/xxx => src/xxx
  //       replacement: '/src',
  //     },
  //   ],
  // },
  server: {
    // watch: {
    //   usePolling: true
    // },
    // strictPort: true,
    port: 3000, // you can replace this port with any port
  }
});