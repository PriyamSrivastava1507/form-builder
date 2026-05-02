import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  define: {
    __BUNDLED_DEV__: JSON.stringify(true),
  },
  // optimizeDeps: {
  //   exclude: ['@dnd-kit/abstract', '@dnd-kit/dom', '@dnd-kit/react'],
  // },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
