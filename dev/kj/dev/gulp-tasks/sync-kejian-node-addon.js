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
      `cd ./vender/node_addons/kejian && git archive --remote=git@git.shuobaotang.com:kejian/node-addon-kejian-usb.git master:output | tar -xv && cd -`
    ] , {
      verbose: true
    })((err)=> {
      if(err) {
        console.log(`Sync vender/node_addons/kejian App Error : ${err}`);
        cb(err);
      } else {
        console.log(`Sync vender/node_addons/kejian Success `);
        cb();
      }
    })
  }
}
}
