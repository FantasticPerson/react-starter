/**
 * Created by lixuexin on 16/4/18.
 */
import sequence from 'run-sequence'
import fs from 'fs';
import * as DEV_CONST from '../const'
import path from 'path';
import shell from 'gulp-shell';
import md5 from 'md5'
import semver from 'semver';

export default (context) => {
  return {
    fn: (cb) => {
      if(__DEBUG__ || __APP_ENV__ !== 'beta' ||
        !context.outZipFilePath || context.outZipFilePath.length == 0) {
        console.log('not match 1');
        cb();
        return;
      }

      //context.outZipFilePath = ['/Users/alex/work/projects/kejian-usb-2.0/build/courseware-76-win32-ia32-beta-debug-2016-06-21_19-58-07-v1.9.0.zip'];

      console.log('outZipFilePath -----------------', context.outZipFilePath.length);
      console.log(context.outZipFilePath);

      let targetPath = null;
      context.outZipFilePath.forEach((zipPath)=>{
        if(!targetPath) {
          if(zipPath.indexOf('win32') != -1) {
            targetPath = zipPath;
          }
        }
      });

      if(!targetPath) {
        console.log('not match 2');
        cb();
        return;
      }

      function getFileSizeInBytes(filename) {
        var stats = fs.statSync(filename)
        var fileSizeInBytes = stats["size"]
        return fileSizeInBytes
      }

      //function increaseVersion(version) {
      //  var verArr = version.split('.').map((value)=>(parseInt(value)));
      //  verArr[verArr.length - 1] = verArr[verArr.length - 1] + 1;
      //  return verArr.join('.');
      //}

      //function getMd5(file) {
      //  return md5(fs.readFileSync(file));
      //}

      let fileBaseName = path.basename(targetPath);
      fileBaseName = fileBaseName.replace('darwin', '{platform}');
      fileBaseName = fileBaseName.replace('win32', '{platform}');
      fileBaseName = fileBaseName.replace('x64', '{arch}');
      fileBaseName = fileBaseName.replace('ia32', '{arch}');

      var versionJson = {
        desc: 'Auto Update | ' + new Date().toLocaleString(),
        last: '999.999.999',//just the last
        source: `http://192.168.0.43/ipa/kejian2.0/${__APP_ENV__}/${fileBaseName}`,
        source_md5: '',//getMd5(targetPath),
        source_bytes_len: getFileSizeInBytes(targetPath) * 2
      };

      //fs.writeFileSync('version.json',"test")

      //console.log(VERSION_DESC_OUTPUT_FILE);
      fs.writeFileSync(DEV_CONST.BUILD_VERSION_JSON, JSON.stringify(versionJson), 'utf8');

      let shellTasks = [`scp "${DEV_CONST.BUILD_VERSION_JSON}" saybot@192.168.0.13:/var/www/alqserver/webapp/current/target/app/courseware/version.json`];

      shell.task(shellTasks, {
        verbose: true
      })((err)=> {
        cb(err);
      })
    }
  }
}
