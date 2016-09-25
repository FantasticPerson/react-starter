import sequence from 'run-sequence'
import * as DEV_CONST from '../const'
import gulp from 'gulp';
import gulpUglify from 'gulp-uglify';

export default (context) => {
  return {
    desc: 'native es6 code to cmd',
    fn: () => {
      return gulp.src([
          `${DEV_CONST.OUTPUT_NATIVE_DIR}/main.js`
        ])
        .pipe(gulpUglify())
        .pipe(gulp.dest(DEV_CONST.OUTPUT_NATIVE_DIR))
    }
  };
};
