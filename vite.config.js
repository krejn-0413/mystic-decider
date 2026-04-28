import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mystic-decider/',     // ← 改成你的仓库名 + 斜杠
})
