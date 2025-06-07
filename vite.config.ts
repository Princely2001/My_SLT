import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',  // Accept connections from any IP (needed for cloud/EC2)
    port: 3000,        // Use a standard port (like 3000) instead of just 3
  },
})
