import shell from 'gulp-shell'
import path from 'path'

export default (context) => {
  return {
    deps: [],
    fn: (cb) => {
      if(!context.outZipFilePath || context.outZipFilePath.length == 0) {
        cb();
      }

      let shellTasks = [];
      context.outZipFilePath.forEach((zipPath)=>{

        let fileBaseNameParts = path.basename(zipPath).split('-');
        let appEnv = fileBaseNameParts[4] || 'dev';
        shellTasks.push(`scp "${zipPath}" saybot@192.168.0.43:/home/saybot/ipa-output/kejian2.0/${appEnv}`);
        shellTasks.push(`echo '\n\n Download Http URL: \n' http://192.168.0.43/ipa/kejian2.0/${appEnv}/${path.basename(zipPath)} '\n\n'`);
      })

      shell.task(shellTasks, {
        verbose: true
      })((err)=> {
        cb(err);
      })
    }
  }
}
