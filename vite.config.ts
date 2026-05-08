import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => ({
  define: {
    __BUNDLED_DEV__: JSON.stringify(true),
  },
  optimizeDeps: {
    include: [
      'react-syntax-highlighter',
      'react-syntax-highlighter/dist/esm/languages/prism/tsx',
      'react-syntax-highlighter/dist/esm/languages/prism/typescript',
      'react-syntax-highlighter/dist/esm/languages/prism/javascript',
      'react-syntax-highlighter/dist/esm/languages/prism/json',
    ],
  },
  plugins: [
    react({
      babel: {
        plugins: mode === 'production' ? [['babel-plugin-react-compiler']] : [],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
