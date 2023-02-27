export default [
  {
    path: '/',
    component: () => import('../components/Layout.vue'),
    children: [
      { path: '/', component: () => import('../components/Index.vue') },

      {
        path: '/hello',
        component: () => import('../components/HelloWorld.vue'),
      },
    ],
  },
];
