import asar from 'asar';
import * as DEV_CONST from '../const'
import shell from 'gulp-shell'

export default (context) => {
  return {
    fn: (cb) => {
      shell.task([
        `cd ${DEV_CONST.OUTPUT_DIR}`,
        ////`mv src.asar src.pasar`,
        //`zip -r ${DEV_CONST.UPDATER_DIR}/update.zip . -x ".DS_Store"`,
        ////`mv src.pasar src.asar`,
        `cd --`
      ].join(' && '), {
        verbose: true
      })((err)=> {
        cb(err);
      })

    }
  }
}
