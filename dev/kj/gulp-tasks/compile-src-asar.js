import asar from 'asar';
import * as DEV_CONST from '../const'
import shell from 'gulp-shell'

export default (context) => {
  return {
    fn: () => {
      return new Promise((resolve, reject) => {
        asar.createPackage(DEV_CONST.OUTPUT_NATIVE_DIR, DEV_CONST.OUTPUT_NATIVE_DIR_ASAR_FILE,
          ()=>{
            resolve();
          });
      })
      .then(()=>{
        return new Promise((resolve, reject) => {
          shell.task(`rm -rf ${DEV_CONST.OUTPUT_NATIVE_DIR} ` , {
            verbose: false
          })((err)=> {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          })
        })
      });
    }
  }
}
