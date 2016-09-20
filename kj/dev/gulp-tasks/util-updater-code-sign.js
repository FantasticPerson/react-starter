/**
 * Created by alex on 16/3/23.
 */
import * as DEV_CONST from '../const'
import shell from 'gulp-shell'

export default (context) => {
  return {
    fn: (cb) => {

        //@see doc Code-Signing.md
      shell.task([
        `signcode -a sha1 -i http://www.alo7.com -$ commercial -spc ${DEV_CONST.ASSETS_CERT_DIR}/code-cert.spc -pvk ${DEV_CONST.ASSETS_CERT_DIR}/code-cert.pvk ${DEV_CONST.UPDATER_EXE_FILE}`
      ] , {
        verbose: true
      })((err)=> {
        if(err) {
          console.log(`Code Sign Error  Err: ${err}`);
          cb(err);
        } else {
          console.log(`Code Sign Success `);
          cb();
        }
      })
    }
  }
}
