import { defineConfig } from 'umi';

export default defineConfig({
  plugins: ['./plugins/wujie/index.ts'],
  wujie: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      routes: [
        {
          path: '/app1',
          component: '@/app1/index',
        },
        {
          path: '/app2',
          component: '@/app2/index',
        },
      ],
    },
  ],
  fastRefresh: {},
});
