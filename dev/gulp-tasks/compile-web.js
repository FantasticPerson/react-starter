/**
 * Created by dandan.wu on 16/9/22.
 */
import gulp from 'gulp'
import del from 'del';
import * as DEV_CONST from '../const'

export default (context) => {
    return {
        fn: () => {
            return del.sync(`${DEV_CONST.OUTPUT_WEB_DIR}/**/*`);
        }
    }
}
