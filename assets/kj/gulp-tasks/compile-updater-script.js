import asar from 'asar';
import * as DEV_CONST from '../const'
import shell from 'gulp-shell'

export default (context) => {
  return {
    fn: (cb) => {
      shell.task([
        `cp ${DEV_CONST.SRC_NATIVE_DIR}/updater/updater.bat ${DEV_CONST.OUTPUT_DIR}/src/native/updater/updater.bat`,
        `cp ${DEV_CONST.SRC_NATIVE_DIR}/updater/updater.sh ${DEV_CONST.OUTPUT_DIR}/src/native/updater/updater.sh`,
      ].join(' && '), {
        verbose: true
      })((err)=> {
        cb(err);
      })

    }
  }
}
