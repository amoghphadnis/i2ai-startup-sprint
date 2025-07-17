import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import flowbiteReact from "flowbite-react/plugin/vite";
// import tailwindcss from 'tailwindcss'; // Add this line
import path from 'path'; // Add this line

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react( ), flowbiteReact(),], // Ensure flowbiteReact() is also here
  base: './',
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
