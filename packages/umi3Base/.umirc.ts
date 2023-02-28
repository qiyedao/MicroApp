import { defineConfig } from 'umi';

export default defineConfig({

  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index',
    routes:[
       {
      path: '/app1',
      component: '@/app1/index',
    },
    {
      path: '/app2',
      component: '@/app2/index',
    }] },
   
  ],
  fastRefresh: {},
});
