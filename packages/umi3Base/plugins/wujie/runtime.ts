import { setupApp, startApp } from 'wujie';

export async function render(oldRender: any) {
  console.log('plugin render');

  oldRender();
  setupApp({
    name: 'app3',
    url: '//localhost:5173/',
    fetch: fetch,
    el: '#root',
  });
  startApp({
    name: 'app3',
    url: '//localhost:5173/',
    el: '#root',
  });
}
