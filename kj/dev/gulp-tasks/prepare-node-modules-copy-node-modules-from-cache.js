import shell from 'gulp-shell'
import * as DEV_CONST from '../const'

export default (context) => {
  return {
    fn: (cb) => {
      copy_node_modules_cache_ToDist()
        .then(()=>{
          cb();
        }, err=>{
          cb(err);
        })
    }
  };
}

function copy_node_modules_cache_ToDist() {
  //return new Promise((resolve, reject) => {
  //  shell.task(`cp ${DEV_CONST.NODE_MODULES_CACHE_FILE} ${DEV_CONST.OUTPUT_DIR}/node_modules.asar` , {
  //    verbose: true
  //  })((err)=> {
  //    if (err) {
  //      reject(err);
  //    } else {
  //      resolve();
  //    }
  //  })
  //})

  //--

  return new Promise((resolve, reject) => {
    shell.task(`mkdir -p ${DEV_CONST.OUTPUT_NATIVE_DIR} && cd ${DEV_CONST.OUTPUT_NATIVE_DIR} && tar -xf ${DEV_CONST.NODE_MODULES_CACHE_FILE}` , {
      verbose: true
    })((err)=> {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
}
