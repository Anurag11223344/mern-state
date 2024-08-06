import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: { // this server is going to have a proxy
    proxy: { //each time you have a requent /api, you just go to add this one at the beginning 'http://localhost:3000'
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },

  plugins: [react()],
})
