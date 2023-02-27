import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import qiankun from 'vite-plugin-qiankun';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun('app2', {
      useDevMode: true,
    }),
  ],
  // 生产环境需要指定运行域名作为base
  // base: 'http://xxx.com/',
  // 主应用跳转避免资源访问不到
  server: {
    origin: 'http://127.0.0.1:5173',
  },
});
