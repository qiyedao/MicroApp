import { defineConfig } from 'umi';

export default defineConfig({
  wujie: {
    master: {
      apps: [
        {
          name: 'app1',
          entry: '//localhost:8001', // html entry
        },
        {
          name: 'app2',
          entry: '//localhost:5173', // html entry
          alive: true,
        },
      ],
    },
  },
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
          microApp: 'app1',
        },
        {
          path: '/app2',
          microApp: 'app2',
        },
      ],
    },
  ],
  fastRefresh: {},
});
