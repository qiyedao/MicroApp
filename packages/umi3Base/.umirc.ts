import { defineConfig } from 'umi';

export default defineConfig({
  qiankun: {
    master: {
      apps: [
        {
          name: 'app1',
          entry: '//localhost:8002', // html entry
        },
        {
          name: 'app2',
          entry: '//localhost:5173', // html entry
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
    {
      path: '/app2',
      microApp: 'app2',
    },
  ],
  fastRefresh: {},
});
