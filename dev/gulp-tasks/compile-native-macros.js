import * as DEV_CONST from '../const'
import gulp from 'gulp'
var fs = require('fs');
import fsExtra from 'fs-extra'

export default (context) => {
  return {
    fn: (cb) => {
      try {
        fsExtra.ensureDirSync(`${DEV_CONST.OUTPUT_NATIVE_DIR}`);
      } catch(err) {
        cb(err);
        return;
      }

      //read
      new Promise((resolve, reject) => {
        fs.readFile(`${DEV_CONST.SRC_DIR}/macros-init.js`, 'utf8', (err, data) => {
          if(!err) {
            //console.log('=====>>>>>>>');
            //console.log(data);
            resolve(data);
          } else {
            reject(err);
          }
        })
      })
      //write
      .then((data) => {
        return new Promise((resolve, reject) => {
          let injectPreCodes = `
            process.env.NODE_ENV = "${__APP_ENV__}";
            process.env.DEBUG = "${__DEBUG__}";
          `;
          data = data.replace('"compile-inject-pre"', injectPreCodes);

          let buildDate = new Date();
          let injectAfterCodes = `
            global.__ELECTRON_SHELL__ = true;
            global.__ES6__ = false;
            let buildDate = new Date();
            global.__BUILD_TIME_STAMP__ = ${buildDate.getTime()}
            global.__BUILD_TIME_STR__ = "${buildDate.toString()}"
          `;
          data = data.replace('"compile-inject-after"', injectAfterCodes);

          fs.writeFile(`${DEV_CONST.OUTPUT_NATIVE_DIR}/macros-init.js`, data, 'utf8', (err) => {
            //console.log('<<<<<=====>>>>>>>');
            //console.log(err);

            if(!err) {
              resolve();
            } else {
              reject(err);
            }
          });
        });
      })
      .then(()=>{
        cb();
      }, (err) => {
        cb(err);
      })
    }
  };
}
