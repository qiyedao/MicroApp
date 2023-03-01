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
  api.addRuntimePlugin(() => '@@/plugin-wujie/masterRuntimePlugin');

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
