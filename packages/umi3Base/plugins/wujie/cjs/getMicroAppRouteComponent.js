var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/getMicroAppRouteComponent.ts
var getMicroAppRouteComponent_exports = {};
__export(getMicroAppRouteComponent_exports, {
  getMicroAppRouteComponent: () => getMicroAppRouteComponent
});
module.exports = __toCommonJS(getMicroAppRouteComponent_exports);
var import_react = __toESM(require("react"));
var import_WujieComponent = require("./WujieComponent");
function getMicroAppRouteComponent(opts) {
  const { base, masterHistoryType, appName, routeProps } = opts;
  const RouteComponent = ({ match }) => {
    const { url, path } = match;
    let umiConfigBase = base === "/" ? "" : base;
    let runtimeMatchedBase = umiConfigBase + (url.endsWith("/") ? url.substr(0, url.length - 1) : url);
    const componentProps = {
      name: appName,
      base: runtimeMatchedBase,
      history: masterHistoryType,
      ...routeProps
    };
    return import_react.default.createElement(import_WujieComponent.WujieComponent, componentProps);
  };
  return RouteComponent;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMicroAppRouteComponent
});
