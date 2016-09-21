import fsExtra from 'fs-extra'
import * as DEV_CONST from '../const'

export default (context) => {
  return {
    fn: (cb) => {
      /**
       * build->
       *    -> win32
       *      -> ia32
       *        -> release
       *        -> debug
       *      -> x64
       *    -> drawin
       */

      let buildOS = __APP_JSON__.builder.os;
      Object.keys(buildOS).forEach((osName) => {
        if (!osName || osName[0] === '_') return;
        let buildConfig = buildOS[osName];
        buildConfig.arch.forEach(archName => {
          fsExtra.ensureDirSync(`${DEV_CONST.BUILD_DIR}/${osName}/${archName}`);
        })
      });

      cb();
    }
  }
}
