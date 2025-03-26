import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.VITE_HOST || '0.0.0.0', // Fallback to 0.0.0.0
    port: parseInt(process.env.VITE_PORT) || 5173, // Ensure it's a number
  }
})
