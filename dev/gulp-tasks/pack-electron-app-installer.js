import * as DEV_CONST from '../const'
import path from 'path'

//const builder = require('electron-builder').init();

let buildPlatformConfigFns = {
  "win32": (context) => {
    return {
      nsiTemplate: DEV_CONST.ASSETS_INSTALL_INSTALLER_NSI_TEMPLATE_FILE,
      version: __APP_JSON__.version,
      icon: DEV_CONST.ASSETS_ICONS_APP_ICO_FILE,
      publisher: __APP_JSON__.author
    }
  },

  'darwin': (context) => {
    return {
      icon: DEV_CONST.ASSETS_ICONS_APP_ICNS_FILE
    }
  }
};

export default (context) => {
  return {
    fn: (cb) => {

      let buildOptions = [];
      let buildOS = __APP_JSON__.builder.os;

      //for test
      if(context.buildAppGreenDirPaths.length == 0) {
        context.buildAppGreenDirPaths.push('/Users/alex/work/projects/kejian-usb-2.0/build/win32/x64/kejian2-win32-x64');
      }

      //console.log("------------------->", context.buildAppGreenDirPaths);

      context.buildAppGreenDirPaths.forEach((buildAppDirPath) => {
        let buildAppDirName = path.basename(buildAppDirPath);
        let buildAppParentDir = path.dirname(buildAppDirPath);
        console.log("------------------->");
        console.log(buildAppDirName);
        console.log(buildAppParentDir);

        let buildAppDirNameArr = buildAppDirName.split('-');

        let buildAppName = buildAppDirNameArr[0];
        let osName =  buildAppDirNameArr[buildAppDirNameArr.length - 2];

        let buildConfig = buildOS[osName];
        let buildPlatformConfigFn = buildPlatformConfigFns[osName];

        let commonBuildConfig = {
          "title" : buildAppName
        };

        let customBuildConfig = buildPlatformConfigFn(context);
        customBuildConfig = Object.assign({}, customBuildConfig, commonBuildConfig);

        let osNameAlias = buildConfig.alias || osName;

        let resultBuildConfig = {
          appPath: buildAppDirPath,
          platform: osNameAlias,
          config: {
            [osNameAlias]: customBuildConfig
          },
          out: buildAppParentDir
        };

        //console.log('===========================>');
        //console.dir(resultBuildConfig);
        buildOptions.push(resultBuildConfig);
      });

      if(!buildOptions || buildOptions.length == 0) {
        cb();
        return;
      }

      buildOptions.reverse();

      next();

      function next() {
        if(!buildOptions || buildOptions.length == 0) {
          cb();
          return;
        }

        let buildOption = buildOptions.pop();
        new Promise((resolve, reject) => {
          console.log(`pack app installer platform: ${buildOption.platform} appPath:${buildOption.appPath} debug: ${__DEV__}`);
          builder.build(buildOption, (err) => {
            if(buildOption.appPath.indexOf('win32') != -1) {
              context.buildAppInstallPaths.push(`${buildOption.appPath} Setup.exe`);
            }

            if(err) {
              reject(reject);
            } else {
              resolve();
            }
          });
        })
        .then(()=> {
          next();
        })
        .catch((err)=> {
          cb(err);
        })
      }
    }
  };
}
