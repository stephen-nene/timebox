// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import dns from 'dns'

// dns.setDefaultResultOrder('verbatim')

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'https://time-box.onrender.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    proxy: {
      '/api': {
        target: 'https://time-box.onrender.com/',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
