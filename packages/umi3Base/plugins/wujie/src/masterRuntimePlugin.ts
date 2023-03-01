import { ApplyPluginsType, IRoute, plugin } from 'umi';
import { getMasterOptions } from '@@/plugin-wujie/masterOptions';
import { getMicroAppRouteComponent } from './getMicroAppRouteComponent';

export async function render(oldRender: any) {
  async function getMasterRuntime() {
    const config = await plugin.applyPlugins({
      key: 'wujie',
      type: ApplyPluginsType.modify,
      initialValue: {},
      async: true,
    });
    const { master } = config;
    return master || config;
  }
  const config = await getMasterRuntime();
  const masterOptons = getMasterOptions();
  console.log('plugin render', masterOptons);
  oldRender();
}

export function patchRoutes(originRoute: IRoute) {
  const { apps = [], masterHistoryType, base } = getMasterOptions();

  console.log('plugin patchRoutes', originRoute, apps);
  originRoute?.routes?.forEach((route) => {
    if (route.microApp) {
      const curr = apps.find((item) => item.name == route.microApp);
      route.component = getMicroAppRouteComponent({
        appName: route.name,
        base,
        masterHistoryType,
        routeProps: { url: curr.entry },
      });
    }

    if (route.routes?.length) {
      patchRoutes(route);
    }
  });

  return originRoute;
}
