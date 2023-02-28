import { IApi, IConfig } from 'umi';
module.exports = (api: IApi) => {
  console.log(api, 'wujie');

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
  api.addRuntimePlugin(() => '../../../plugins/wujie/runtime.ts');
};
