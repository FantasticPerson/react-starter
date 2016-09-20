/**
 * Created by xuexinli on 16/1/28.
 */
import gulp from 'gulp'
import del from 'del';
import * as DEV_CONST from '../const'
export default (context) => {
  return {
    fn: () => {
      return  gulp.watch(`${DEV_CONST.SRC_SERVER_DIR}/**/*`, ['server-babel']);
    }
  };
}
