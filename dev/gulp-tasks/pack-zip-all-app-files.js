import webpack from 'webpack'
import * as DEV_CONST from '../const'
import shell from 'gulp-shell'
import dateFormat from 'dateformat'
import path from 'path'

export default (context) => {
  return {
    fn: (cb) => {
      let releaseFlag = `${__DEBUG__ ? 'debug' : 'release'}`;
      let appEnvFlag = `${__APP_ENV__}`;
      let timeStamp = `${dateFormat(new Date(), "yyyy-mm-dd_HH-MM-ss")}`;

      let buildTimes = context.buildTimes || 0;

      console.log('zip build all app dir ...');
      console.log('-----------------------------------------');


      let buildAppGreenDirPaths = context.buildAppGreenDirPaths || [];
      if (buildAppGreenDirPaths.length == 0) cb();

      context.outZipFilePath = [];

      let zipTasks = [];
      buildAppGreenDirPaths.forEach((appPath)=> {
        let appPaths = appPath.split('/');
        let appName = appPaths.pop();
        let arch = appPaths.pop();
        let platform = appPaths.pop();

        let appPathParentDir = path.join(appPath, '..');

        let appZipFileName = `${appName}-${buildTimes}-${platform}-${arch}-${appEnvFlag}-${releaseFlag}-${timeStamp}-v${__APP_JSON__.version}.zip`;
        let appZipFilePath = `${DEV_CONST.BUILD_DIR}/${appZipFileName}`;

        zipTasks.push(`cd ${appPathParentDir} && zip -x "\.*" -rqy ${appZipFilePath} . && cd -`);

        if(context.outZipFilePath.indexOf(appZipFilePath) == -1) {
          context.outZipFilePath.push(appZipFilePath);
        }

        if (platform === 'win32') {
          zipTasks.push(`python ./scripts/modify_file_attr_in_zip.py ${appZipFilePath}`);
        }

        if (platform === 'win32' && releaseFlag === 'release') {
          context.targetZipFilePath = appZipFilePath;
        }
      });

      let shellTasks = `pwd && ${zipTasks.join(' && ')}  && pwd`;

      shell.task(shellTasks, {
        verbose: true
      })((err)=> {
        cb(err);
      })
    }
  }
}

