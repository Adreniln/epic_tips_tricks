import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // If your entry point is different, adjust this:
  build: {
    outDir: 'dist',
  },
  // Add if you need to serve from a different root:
  // root: './src',
})