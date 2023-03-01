import { getMasterOptions, getMicroAppRouteComponent, IRoute } from 'umi';

export function render(oldRender: any) {
  console.log('runtime render');

  oldRender();
}
