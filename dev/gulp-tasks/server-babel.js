/**
 * Created by xuexinli on 16/1/28.
 */
import gulp from 'gulp'
import del from 'del';
import * as DEV_CONST from '../const';
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var path = require('path');

var sourceRoot = path.join(__dirname, `${DEV_CONST.SRC_SERVER_DIR}`);
export default (context) => {
  return {
    fn: () => {
      return gulp.src(`${DEV_CONST.SRC_SERVER_DIR}/**/*.js`)
        .pipe(sourcemaps.init())
        .pipe(babel({
          plugins: ['transform-runtime']
        }))
        .pipe(sourcemaps.write('.', {sourceRoot: sourceRoot}))
        .pipe(gulp.dest(`${DEV_CONST.OUTPUT_SERVER}`));
    }
  };
}
