import gulp from 'gulp'
import del from 'del';
import * as DEV_CONST from '../const'

export default (context) => {
  return {
    deps: [
      !!process.env.SKIP_CLEAN_DIST ? 'empty' : 'clean-dist',
      //'clean-libs',
      'clean-build'
      ],
    fn: () => {
      return del.sync(`${DEV_CONST.OUTPUT_DIR}/**/*`);
    }
  }
}
