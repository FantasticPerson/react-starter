import gulp from 'gulp'
import del from 'del';
import * as DEV_CONST from '../const'

export default (context) => {
  return {
    fn: () => {
      return gulp.src([
          `${DEV_CONST.ASSETS_NATIVE_DIR}/**/*`
        ])
        .pipe(gulp.dest(`${DEV_CONST.OUTPUT_NATIVE_ASSETS_DIR}`));
    }
  };
}
