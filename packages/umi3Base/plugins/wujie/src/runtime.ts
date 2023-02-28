import { setupApp, startApp } from 'wujie';
import { ApplyPluginsType, plugin } from 'umi';
import {
  getMasterOptions,
  setMasterOptions,
} from '@@/plugin-wujie/masterOptions';

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
  console.log('plugin render', config, masterOptons);
  const apps = masterOptons?.apps;
  oldRender();
}
