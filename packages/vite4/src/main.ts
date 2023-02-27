import { createApp } from 'vue';
import App from './App.vue';
import {
  renderWithQiankun,
  qiankunWindow,
  QiankunProps,
} from 'vite-plugin-qiankun/dist/helper';
import routes from './router/index';
import { createWebHistory, createRouter } from 'vue-router';
const render = (props: QiankunProps = {}) => {
  console.log('props', props);

  const { container } = props;
  const el: string | Element = container?.querySelector('#app') || '#app'; // 避免 id 重复导致微应用挂载失败
  const app = createApp(App);
  const router = createRouter({
    history: createWebHistory(
      qiankunWindow.__POWERED_BY_QIANKUN__ ? props.base : '/',
    ),

    routes,
  });
  app.use(router);
  app.mount(el);
};

const initQianKun = () => {
  renderWithQiankun({
    bootstrap() {
      console.log('微应用：bootstrap');
    },
    mount(props) {
      // 获取主应用传入数据
      console.log('微应用：mount', props.name, 'history base', props.base);
      render(props);
    },
    unmount(props) {
      console.log('微应用：unmount', props);
    },
    update(props) {
      console.log('微应用：update', props);
    },
  });
};

qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render(); // 判断是否使用 qiankun ，保证项目可以独立运行
