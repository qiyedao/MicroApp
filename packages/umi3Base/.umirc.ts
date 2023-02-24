import { defineConfig } from 'umi';

export default defineConfig({
  qiankun: {
    master: {
      apps: [
        {
          name: 'app1',
          entry: '//localhost:8001', // html entry
        },
      ],
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      path: '/app1',
      microApp: 'app1',
    },
  ],
  fastRefresh: {},
});
