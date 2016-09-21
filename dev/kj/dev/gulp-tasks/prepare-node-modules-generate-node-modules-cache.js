import shell from 'gulp-shell'
import * as DEV_CONST from '../const'

export default (context) => {
  return {
    fn: (cb) => {
      generate_node_nodules_Cahce()
      .then(()=>{
        cb();
      }, err=>{
        cb(err);
      })
    }
  };
}

function generate_node_nodules_Cahce() {
  return new Promise((resolve, reject) => {
    //asar.createPackage(DEV_CONST.OUTPUT_NODE_MODULES_DIR,
    //  DEV_CONST.NODE_MODULES_CACHE_FILE,
    //  (err)=> {
    //    if(err) {
    //      reject(err);
    //    } else {
    //      resolve();
    //    }
    //  });

    //--

    shell.task(`cd ${DEV_CONST.OUTPUT_DIR} && tar -cvf ${DEV_CONST.NODE_MODULES_CACHE_FILE} --exclude-from=../node_modules.exclude ./node_modules && cd -` , {
      verbose: false
    })((err)=> {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })

  })
    .then(()=> {
      return new Promise((resolve, reject) => {
        //dele node_modules dir
        shell.task(`rm -rf ${DEV_CONST.OUTPUT_NODE_MODULES_DIR}` , {
          verbose: false
        })((err)=> {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        })
      });
    })
}
