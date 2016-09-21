import sequence from 'run-sequence'
import * as DEV_CONST from '../const'
import gulp from 'gulp';
import babel from 'gulp-babel';
import gulpEmpty from "gulp-empty";
import gulpUglify from 'gulp-uglify';
import codeProtection from '../utils/gulp-code-protection';
import rename from "gulp-rename"


export default (context) => {
  return {
    desc: 'native es6 code to cmd',
    fn: () => {

      //let noCompileToJse = false;
      let noCompileToJse = __DEBUG__;

      let tasks = [
        `${DEV_CONST.SRC_DIR}/**/*.js`,
        `${DEV_CONST.OUTPUT_NATIVE_DIR}/macros-init.js`,
        `!${DEV_CONST.SRC_DIR}/web/**/*.js`,
        `!${DEV_CONST.SRC_DIR}/common/**/*.js`,
        `!${DEV_CONST.SRC_DIR}/macros-init.js`,
        `!${DEV_CONST.SRC_DIR}/main.js`
      ];

      if(!__DEBUG__) {
        tasks.push(
          `!${DEV_CONST.SRC_DIR}/native/utils/buffer-xor.js`
        );
      }

      return gulp.src(tasks)
        .pipe(babel())
        //__DEBUG__
        .pipe(__DEBUG__ ? gulpEmpty() : gulpUglify({
          global_defs: {
            __DEBUG__: false
          },
          conditionals: true,
        }))
        .pipe(noCompileToJse ? gulpEmpty() : codeProtection())
        .pipe(noCompileToJse ? gulpEmpty() : rename({
          extname: ".jse"
        }))
        .pipe(gulp.dest(`${DEV_CONST.OUTPUT_NATIVE_DIR}`))
    }
  };
};
