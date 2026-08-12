import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/dojo-sant-gervasi-preview/',
  plugins: [react()],
})
