import { createApp } from 'vue';
import App from './App.vue';

import routes from './router/index';
import { createWebHistory, createRouter } from 'vue-router';
const render = (props: any = {}) => {
  console.log('props', props);

  const { container } = props;
  const el: string | Element = container?.querySelector('#app') || '#app'; // 避免 id 重复导致微应用挂载失败
  const app = createApp(App);
  const router = createRouter({
    history: createWebHistory(window.__POWERED_BY_WUJIE__ ? props.base : '/'),

    routes,
  });
  app.use(router);
  app.mount(el);
};

if (window.__POWERED_BY_WUJIE__) {
  let instance: any;
  window.__WUJIE_MOUNT = () => {
    const router = createRouter({ history: createWebHistory(), routes });
    instance = createApp(App);
    instance.use(router);
    instance.mount('#app');
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.unmount();
  };
  /*
    由于vite是异步加载，而无界可能采用fiber执行机制
    所以mount的调用时机无法确认，框架调用时可能vite
    还没有加载回来，这里采用主动调用防止用没有mount
    无界mount函数内置标记，不用担心重复mount
  */
  window.__WUJIE.mount();
} else {
  render();
}
