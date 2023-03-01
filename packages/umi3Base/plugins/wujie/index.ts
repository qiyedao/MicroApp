module.exports = function (api: any) {
  api.addRuntimePluginKey(() => 'wujie');

  api.describe({
    key: 'wujie',
    config: {
      schema(joi) {
        return joi.object().keys({
          master: joi.object(),
        });
      },
    },
  });

  api.registerPlugins([module.require('./src')]);
};
