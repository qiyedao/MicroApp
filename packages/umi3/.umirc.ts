import { defineConfig } from 'umi';

export default defineConfig({
  qiankun: {
    slave: {},
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/page2', component: '@/pages2/index' },
  ],
  fastRefresh: {},
});
