import fsExtra from 'fs-extra'
import electronPackager from 'electron-packager'
import * as DEV_CONST from '../const'
import del from 'del';
import shell from 'gulp-shell'
import path from 'path'
import signcode from 'signcode'
import fs from 'fs'
//import electronOSXCodeSign from 'electron-osx-sign';

//
//console.log('===========================================0');
//console.dir(shell);

let buildPlatformConfigFns = {
  "win32": (context) => {
    return {
      'icon': DEV_CONST.ASSETS_ICONS_APP_ICO_FILE,
      'version-string': {
        'CompanyName': '说宝堂信息科技(上海)有限公司 上海爱乐奇网络科技有限公司 上海钦文信息科技有限公司',
        'LegalCopyright': 'Copyright©2010-2016 说宝堂信息科技(上海)有限公司 上海爱乐奇网络科技有限公司 上海钦文信息科技有限公司版权所有',
        'FileDescription': 'Alo7 Courseware',
        'OriginalFilename': __APP_JSON__.name + '.exe',
        'ProductName': 'Alo7 Courseware',
        'InternalName': 'Alo7 Courseware'
      }
    }
  },
  "darwin": (context) => {
    return {
      'icon': DEV_CONST.ASSETS_ICONS_APP_ICNS_FILE,
      'app-bundle-id': __APP_JSON__.bundle_id, //OS X only
      'app-category-type': 'public.app-category.developer-tools', //OS X only
      'osx-sign': false//we do it our-self and do some files copy
    }
  }
};

export default (context) => {
  return {
    fn: (cb) => {
      let buildOptions = [];

      let buildOS = __APP_JSON__.builder.os;

      console.log('===============================================');
      console.dir(__APP_JSON__.builder);

      const buildPlatform = process.env.BUILD_PLATFORM;

      Object.keys(buildOS).forEach((osName) => {
        if(osName.charAt(0) === '_') return;
        if(buildPlatform && buildPlatform !== osName) return;

        console.log(`pack-electron-green ${osName}`);

        let buildConfig = buildOS[osName];
        let appName = `${__APP_JSON__.app_name}`;
        let buildPlatformConfigFn = buildPlatformConfigFns[osName];

        buildConfig.arch.forEach(archName => {
          let commonBuildConfig = {
            'name': `${appName}`,
            'arch': archName,
            'dir': DEV_CONST.OUTPUT_DIR,
            'platform': osName,
            //'asar': true,
            //'asar-unpack-dir': './public',
            'out': `${DEV_CONST.BUILD_DIR}/${osName}/${archName}`,
            'ignore': [/.DS_Store/, /.git/],
            'overwrite': true,
            //'prune': __PROD__,
            'version': __APP_JSON__.devDependencies['electron-prebuilt'],//this is the target version
            'app-copyright':'Copyright©2010-2016 说宝堂信息科技(上海)有限公司 上海爱乐奇网络科技有限公司 上海钦文信息科技有限公司版权所有',
            'app-version': __APP_JSON__.version,
            'build-version': __APP_JSON__.version
          };

          let customBuildConfig = buildPlatformConfigFn(context);
          customBuildConfig = Object.assign({}, customBuildConfig, commonBuildConfig);

          buildOptions.push(customBuildConfig);
        });
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

        //electronPackager
        new Promise((resolve, reject) => {
          electronPackager(buildOption, (err, appPath) => {
            if(err) {
              reject(err);
            } else {
              if(Array.isArray(appPath)) {
                appPath = appPath[0];
              }
              resolve(appPath);
            }
          });
        })
        .then((appPath) => {
          return appDirChangeName(appPath, buildOption, context);
        })
        .then((appPath)=>{
          return appDirAppendFiles(appPath, buildOption);
        })
        .then((appPath)=>{//code sign
          return appCodeSign(appPath, buildOption);
        })
        .then(() => {
          next();
        })
        .catch((err) => {
          cb(err);
          process.exit(-1);
        })
      }
    }
  };
}

function appDirChangeName(appPath, buildOption, context) {
  console.log('appDirChangeName');
  return new Promise((resolve, reject) => {
    let sourceAppPath = appPath;

    let appDirPath = path.dirname(appPath);
    let appDirName = path.basename(appPath);
    appDirName = appDirName.split('-')[0];
    appPath = `${appDirPath}/${appDirName}`;

    //app改名
    shell.task(`mv ${sourceAppPath} ${appPath}` , {
      verbose: true
    })((err)=> {
      if (err) {
        reject(err);
      } else {
        console.log(`pack app noinstall platform: ${buildOption.platform} arch: ${buildOption.arch} debug: ${__DEV__} path: ${appPath}`);
        context.buildAppGreenDirPaths.push(appPath);

        console.log('buildAppGreenDirPaths', appPath);

        resolve(appPath);
      }
    });
  });
}

function appDirAppendFiles(appPath, buildOption) {
  console.log('appDirAppendFiles');
  //打包 flashplayer, & Updater & node_addons
  return new Promise((resolve, reject) => {
    const flashPlayerConfig = __APP_JSON__.flashplayer[buildOption.platform][buildOption.arch];
    const flashPlayerName = flashPlayerConfig.name;

    let appDirName = path.basename(appPath);

    let sourceFlashPlayerPath = `${DEV_CONST.VENDER_FLASHPLAYER_DIR}/${buildOption.platform}/${buildOption.arch}/${flashPlayerName}`;
    let targetFlashPlayerDir = buildOption.platform === 'win32' ? `${appPath}/resources/app/vender/flashplayer/${buildOption.platform}/${buildOption.arch}` :
      `${appPath}/${appDirName}.app/Contents/Resources/app/vender/flashplayer/${buildOption.platform}/${buildOption.arch}`;

    //let sourceNodeAddonsDir = `${DEV_CONST.VENDER_DIR}/node_addons`;
    //let targetNodeAddonsDir = buildOption.platform === 'win32' ? `${appPath}/resources/app/vender/node_addons` :
    //  `${appPath}/${appDirName}.app/Contents/Resources/app/vender/node_addons`;

    let tasks = [
      `mkdir -p ${targetFlashPlayerDir}`,
      `cp -p -r ${sourceFlashPlayerPath} ${targetFlashPlayerDir}`,
      //`cp -p -r ${sourceNodeAddonsDir} ${targetNodeAddonsDir}`
    ];


    if(buildOption.platform === 'win32') {
      //updater
      tasks.push(`cp ${DEV_CONST.UPDATER_DIR}/${__APP_ENV__}/${DEV_CONST.UPDATER_WIN_EXE_FILE_NAME} ${appPath}`);
    } else if (buildOption.platform === 'darwin') {
      tasks.push(`cp -p -r ${DEV_CONST.UPDATER_DIR}/${__APP_ENV__}/${DEV_CONST.UPDATER_MAC_EXE_FILE_NAME} ${appPath}`);
    }

    //root
    tasks.push(`cp -p -r ${DEV_CONST.ASSETS_ROOT_DIR}/* ${appPath}`);

    shell.task(tasks , {
      verbose: true
    })((err)=> {
      if(err) {
        reject(err);
      } else {
        resolve(appPath);
      }
    })
  });
}

function appCodeSign(appPath, buildOption) {
  //u can comment the code line for local test.
  //return;
  if(!__JENKINS__) return;

  console.log('\nappCodeSign ============================>');

  if(buildOption.platform === 'win32') {
    return Promise.resolve(true)
      .then(()=>{
        return winCodeSign(`${appPath}/${__APP_NAME__}.exe`);
      })
      .then(()=>{
        return winCodeSign(`${appPath}/upd.exe`);
      });
  } else {
    return Promise.resolve(true)
      .then(()=>{
        return macCodeSign(`${appPath}/${__APP_NAME__}.app`);
      })
      .then(()=>{
        return macCodeSign(`${appPath}/upd.app`)
      });
  }
}

function macCodeSign(exePath) {
  return new Promise((resolve, reject) => {
    //here import cert first in mac and psw 'saybotalo7'
    let tasks = [];

    let basename = path.basename(exePath, '.app');
    const childPlist = '';//`--entitlements "${DEV_CONST.ASSETS_DIR}/child_app.plist"`;

    if(__JENKINS__) {
      tasks.push(`security unlock-keychain "-p" "saybot" "/Users/saybot/Library/Keychains/login.keychain"`);
    }

    const IDENTITY = "Developer ID Application: ALO7 HK Limited (WJFKG4XLTJ)";

    //stupid here, the deep don't work?
    //let codeSignPrefix = `codesign --force --verify --verbose -s "3rd Party Mac Developer Application: ALO7 HK Limited (WJFKG4XLTJ)"`;
    //let codeSignPrefix = `codesign --force --verify --verbose --sign "${IDENTITY}"`;
    //very important do not remove it.
    //WMXCWd8pf6 WMXCWd8pf6 WMXCWd8pf6
    //if(basename === 'courseware') {
      //const appFrameworksPath = `${exePath}/Contents/Frameworks`;

      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Electron Framework.framework/Versions/A/Electron Framework"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Electron Framework.framework/Versions/A/Libraries/libnode.dylib"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Electron Framework.framework"`);
      //
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Mantle.framework/Versions/A/Mantle"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Mantle.framework"`);
      //
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/ReactiveCocoa.framework/Versions/A/ReactiveCocoa"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/ReactiveCocoa.framework"`);
      //
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Squirrel.framework/Versions/A/Squirrel"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Squirrel.framework"`);
      //
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/${basename} Helper.app/Contents/MacOS/${basename} Helper"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/${basename} Helper.app/"`);
      //
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/${basename} Helper EH.app/Contents/MacOS/${basename} Helper EH"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/${basename} Helper EH.app/"`);
      //
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/${basename} Helper NP.app/Contents/MacOS/${basename} Helper NP"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/${basename} Helper NP.app/"`);

      //=========================================================
      //=========================================================
      //=========================================================

      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Electron Framework.framework/Electron Framework"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Electron Framework.framework/Versions/A/Electron Framework"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Electron Framework.framework/Versions/A/Libraries/libnode.dylib"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Electron Framework.framework"`);
      //
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Mantle.framework/Mantle"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Mantle.framework/Versions/A/Mantle"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Mantle.framework"`);
      //
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/ReactiveCocoa.framework/ReactiveCocoa"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/ReactiveCocoa.framework/Versions/A/ReactiveCocoa"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/ReactiveCocoa.framework"`);
      //
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Squirrel.framework/Squirrel"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Squirrel.framework/Versions/A/Squirrel"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/Squirrel.framework"`);
      //
      //
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/${basename} Helper.app/Contents/MacOS/${basename} Helper"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/${basename} Helper.app/"`);
      //
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/${basename} Helper EH.app/Contents/MacOS/${basename} Helper EH"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/${basename} Helper EH.app/"`);
      //
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/${basename} Helper NP.app/Contents/MacOS/${basename} Helper NP"`);
      //tasks.push(`${codeSignPrefix} "${appFrameworksPath}/${basename} Helper NP.app/"`);

      //==========================================================================
      //==========================================================================

    //  tasks.push(`${DEV_CONST.APP_DIR}/node_modules/.bin/electron-osx-sign ${exePath} --identity "${IDENTITY}" --platform "darwin" --version "${__APP_JSON__.devDependencies['electron-prebuilt']}"`);
    //} else if('upd') {
    //  //nothing?
    //
    //  tasks.push(`${codeSignPrefix} "${exePath}/Contents/MacOS/${basename}"`);
    //  tasks.push(`${codeSignPrefix} ${exePath}`);
    //}


    //=======================================================================
    //=======================================================================

    tasks.push(`codesign --force --verify --verbose --deep --timestamp=none --sign "${IDENTITY}" ${exePath}`);

    tasks.push(`echo "\n\n===========================================\n\n"`);
    tasks.push(`echo "############ verifying 1 signature"`);
    tasks.push(`codesign --verify --deep --verbose=3 -d ${exePath}`);

    tasks.push(`echo "############ verifying 2 signature"`);
    tasks.push(`spctl -a --type execute -vvvv ${exePath}`);
    tasks.push(`echo "\n\n===========================================\n\n"`);

    shell.task(tasks , {
      verbose: true
    })((err)=> {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
}

function winCodeSign(exePath) {
  let appDirName = path.dirname(exePath);
  let appBaseName = path.basename(exePath, '.exe');

  return new Promise((resolve, reject) => {
    let options = {
      cert: `${DEV_CONST.ASSETS_CERT_DIR}/win_cert.pfx`,
      path: exePath,
      //password: 'mqhGJIHUNlpO',
      password: 'SAYBOTalo7',
      site: "www.alo7.com"
    };

    signcode.sign(options, function (error) {
      if (error) {
        console.error('Signing failed', error.message);
        reject(error)
      } else {
        console.log(options.path + ' is now signed');
        resolve();
      }
    })
  })
  .then(()=>{
    return new Promise((resolve, reject)=>{
      shell.task([
        `rm ${exePath} && mv ${appDirName}/${appBaseName}-signed.exe ${appDirName}/${appBaseName}.exe`
      ] , {
        verbose: true
      })((err)=> {
        if(err) {
          reject(err);
        } else {
          resolve();
        }
      })
    })
  })
}

//function hideAppFiles(appPath, buildOption) {
//  console.log('hideAppFiles');
//
//  return new Promise((resolve, reject) => {
//    shell.task([
//      `wine cmd.exe /c echo %cd%\\${appPath}\\fileName`
//    ] , {
//      verbose: true
//    })((err)=> {
//      if(err) {
//        reject(err);
//      } else {
//        resolve();
//      }
//    })
//  });
//
//  return;
//  if(buildOption.platform === 'win32') {
//    let tasks = fs.readdirSync(appPath).filter((fileName)=>{
//      let extname = path.extname(fileName);
//      if(extname === '.exe') return false;
//      if(extname === '.pdf') return false;
//      if(extname === '.txt') return false;
//      return true;
//    }).map((fileName)=>{
//      //let filePath = path.join(appPath, fileName);
//      return new Promise((resolve, reject) => {
//
//        shell.task([
//          `wine cmd.exe /c echo %cd%\\${appPath}\\fileName`
//        ] , {
//          verbose: true
//        })((err)=> {
//          if(err) {
//            reject(err);
//          } else {
//            resolve();
//          }
//        })
//
//      })
//    });
//
//    return Promise.all(tasks);
//  } else {
//    return Promise.resolve(1);
//  }
//}
