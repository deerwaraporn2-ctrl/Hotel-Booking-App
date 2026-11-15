
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Tells Vite that the app will be hosted inside this repository path
  base: '/Hotel-Booking-App/',

  plugins: [react()],
})
