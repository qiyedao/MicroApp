var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/masterRuntimePlugin.ts
var masterRuntimePlugin_exports = {};
__export(masterRuntimePlugin_exports, {
  patchRoutes: () => patchRoutes,
  render: () => render
});
module.exports = __toCommonJS(masterRuntimePlugin_exports);
var import_umi = require("umi");
var import_masterOptions = require("@@/plugin-wujie/masterOptions");
var import_getMicroAppRouteComponent = require("./getMicroAppRouteComponent");
async function render(oldRender) {
  async function getMasterRuntime() {
    const config = await import_umi.plugin.applyPlugins({
      key: "wujie",
      type: import_umi.ApplyPluginsType.modify,
      initialValue: {},
      async: true
    });
    const { master } = config;
    return master || config;
  }
  const runtimeOptions = await getMasterRuntime();
  let masterOptions = {
    ...(0, import_masterOptions.getMasterOptions)(),
    ...runtimeOptions
  };
  const masterApps = masterOptions.apps || [];
  const credentialsApps = masterApps.filter((app) => app.credentials);
  if (credentialsApps.length) {
    const defaultFetch = masterOptions.fetch || window.fetch;
    const fetchWithCredentials = (url, init) => {
      if (credentialsApps.some((app) => app.entry === url)) {
        return defaultFetch(url, {
          ...init,
          mode: "cors",
          credentials: "include"
        });
      }
      return defaultFetch(url, init);
    };
    masterOptions = { ...masterOptions, fetch: fetchWithCredentials };
  }
  (0, import_masterOptions.setMasterOptions)(masterOptions);
  oldRender();
}
function patchRoutes(originRoute) {
  var _a;
  const { apps = [], masterHistoryType, base, fetch } = (0, import_masterOptions.getMasterOptions)();
  (_a = originRoute == null ? void 0 : originRoute.routes) == null ? void 0 : _a.forEach((route) => {
    var _a2;
    if (route.microApp) {
      const curr = apps.find((item) => item.name == route.microApp);
      route.component = (0, import_getMicroAppRouteComponent.getMicroAppRouteComponent)({
        appName: route.name,
        base,
        masterHistoryType,
        routeProps: { url: curr.entry, ...curr, fetch }
      });
    }
    if ((_a2 = route.routes) == null ? void 0 : _a2.length) {
      patchRoutes(route);
    }
  });
  return originRoute;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  patchRoutes,
  render
});
