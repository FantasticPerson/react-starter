import gulp from 'gulp'
import del from 'del';
import * as DEV_CONST from '../const'

export default (context) => {
  return {
    fn: () => {
      return del.sync([
        `${DEV_CONST.BUILD_DIR}/**/*`
        //`!${DEV_CONST.BUILD_DIR}/**/*.zip`
      ]);
    }
  }
}
