import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import process from 'node:process';
// https://vite.dev/config/
export default defineConfig({
 base: process.env.VERCEL ? '/' : '/Synkra-company/',
  plugins: [react(), svgr()],
});
