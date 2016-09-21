import gulp from 'gulp'
import sequence from 'run-sequence'

export default (context) => {
  return {
    fn: (cb) => {
      console.log(process.env.SKIP_PREPARE, process.env.SKIP_COMPILE)
      //print infos
      console.log('-----------------------------------');
      console.log(`app_env: ${__APP_ENV__}`);
      console.log(`app_ver: ${__VERSION__}`);
      console.log('-----------------------------------');
      sequence(
        'init',
        'clean',
        !!process.env.SKIP_PREPARE ? 'empty' : 'prepare',
        !!process.env.SKIP_COMPILE ? 'empty' : 'compile',
        //'updater',
        'pack',
        __JENKINS__ ? 'jenkins' : 'empty',
        cb
      );
    }
  }
}

//if want to only want to build
// BUILD_PLATFORM=darwin SKIP_CLEAN_DIST= SKIP_PREPARE= SKIP_COMPILE=  DEBUG=true gulp build
