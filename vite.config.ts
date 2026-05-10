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
  build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        
        // State
        'zustand': ['zustand'],
        
        // DnD
        'dnd-kit': ['@dnd-kit/react', '@dnd-kit/dom', '@dnd-kit/abstract'],
        
        // UI / Radix
        'radix-ui': ['radix-ui', '@radix-ui/react-switch', '@radix-ui/react-popover', '@radix-ui/react-dialog'],
        
        // Syntax highlighting — output page only
        'syntax-highlighter': ['react-syntax-highlighter'],
        
        // Schema validation — output page only  
        'validators': ['zod', 'yup'],
        
        // Shadcn utilities
        'shadcn-utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
        
        // Date
        'date-fns': ['date-fns'],
        
        // Icons
        'lucide': ['lucide-react'],
      }
    }
  }
}
}))
