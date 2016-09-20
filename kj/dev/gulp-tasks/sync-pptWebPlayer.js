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
      `cd assets/public/subapp/pptWebPlayer && git archive --remote=git@git.saybot.net:others/pptWebPlayer.git master:KeynoteDHTMLPlayer | tar -xv && cd -`
    ] , {
      verbose: true
    })((err)=> {
      if(err) {
        console.log(`Sync pptWebPlayer Error : ${err}`);
        cb(err);
      } else {
        console.log(`Sync pptWebPlayer App Success `);
        cb();
      }
    })
  }
}
}
