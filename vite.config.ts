import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // relative base so the build works under any GitHub Pages sub-path
  // (https://<user>.github.io/<repo>/) without hard-coding the repo name.
  base: './',
  plugins: [react()],
})
