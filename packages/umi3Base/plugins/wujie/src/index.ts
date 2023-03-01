import { IApi, IConfig, utils } from 'umi';
import modifyRoutes from './modifyRoutes';
export const defaultHistoryType = 'browser';

module.exports = (api: IApi) => {
  console.log(api.userConfig, 'wujie');

  api.describe({
    key: 'wujie',
    config: {
      default: {},
      schema(joi) {
        return joi.object();
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
    enableBy: api.EnableBy.config,
  });
  api.addRuntimePlugin(() => '../plugin-wujie/masterRuntimePlugin');

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: 'plugin-wujie/WujieComponent.tsx',
      content: `
      import React from 'react';
      import WujieReact from 'wujie-react';
      export  function WujieComponent(props) {
        return (
          <WujieReact
            width="100%"
            height="100%"
            name={props.name}
            url={props.url}
            sync={true}
            fetch={fetch}
            alive={true}
          ></WujieReact>
        );
      }
      
      `,
    });
    api.writeTmpFile({
      path: 'plugin-wujie/getMicroAppRouteComponent.ts',
      content: `
      import React from 'react';
  import {WujieComponent} from './WujieComponent';
  
  export function getMicroAppRouteComponent(opts: {
    appName: string;
    base: string;
    masterHistoryType: string;
    routeProps?: any;
  }) {
    const { base, masterHistoryType, appName, routeProps } = opts;
    const RouteComponent = ({ match }: any) => {
      const { url, path } = match;
  
      // 默认取静态配置的 base
      let umiConfigBase = base === '/' ? '' : base;
  
      let runtimeMatchedBase =
        umiConfigBase + (url.endsWith('/') ? url.substr(0, url.length - 1) : url);
  
      const componentProps = {
        name: appName,
        base: runtimeMatchedBase,
        history: masterHistoryType,
        ...routeProps,
      };
      return React.createElement(WujieComponent, componentProps);
    };
  
    return RouteComponent;
  }
  
      
      `,
    });
    api.writeTmpFile({
      path: 'plugin-wujie/masterRuntimePlugin.ts',
      content: `import { ApplyPluginsType, IRoute, plugin } from 'umi';
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
      `,
    });
  });
  api.addUmiExports(() => {
    const pinnedExport = 'WujieComponent';
    const exports: any[] = [
      {
        specifiers: [pinnedExport],
        source: '../plugin-wujie/WujieComponent',
      },
    ];

    return exports;
  });

  api.addUmiExports(() => {
    return {
      specifiers: ['getMicroAppRouteComponent'],
      source: '../plugin-wujie/getMicroAppRouteComponent',
    };
  });
  api.addUmiExports(() => {
    return {
      specifiers: ['getMasterOptions'],
      source: '../plugin-wujie/masterOptions',
    };
  });
  // modifyRoutes(api);
  api.onGenerateFiles(() => {
    const {
      config: { history },
    } = api;
    const { master: options } = api.config?.wujie || {};
    const masterHistoryType = (history && history?.type) || defaultHistoryType;
    const base = api.config.base || '/';

    api.writeTmpFile({
      path: 'plugin-wujie/masterOptions.js',
      content: `
      let options = ${JSON.stringify({
        masterHistoryType,
        base,
        ...options,
      })};
      export const getMasterOptions = () => options;
      export const setMasterOptions = (newOpts) => options = ({ ...options, ...newOpts });
      `,
    });
  });
};
