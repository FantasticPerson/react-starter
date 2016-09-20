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
      `cd updater && git archive --remote=git@git.shuobaotang.com:others/KJUpdater.git master:dist | tar -xv && cd -`
    ] , {
      verbose: true
    })((err)=> {
      if(err) {
        console.log(`Sync Updater App Error : ${err}`);
        cb(err);
      } else {
        console.log(`Sync Updater App Success `);
        cb();
      }
    })
  }
}
}
