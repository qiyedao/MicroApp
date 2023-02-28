import WujieReact from 'wujie-react';
import hostMap from './hostMap';
import fetch from './fetch';
import lifecycles from './lifecycle';
export function render(oldRender: any) {
  const { setupApp } = WujieReact;

  setupApp({
    name: 'app1',
    url: hostMap('//localhost:8001/'),
    fetch: fetch,
    ...lifecycles,
  });
  setupApp({
    name: 'app2',
    url: hostMap('//localhost:5173/'),
    fetch: fetch,
    ...lifecycles,
  });
  oldRender();
}
