import { defineConfig } from 'umi';

export default defineConfig({
 
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/page2', component: '@/pages2/index' },
  ],
  fastRefresh: {},
});
