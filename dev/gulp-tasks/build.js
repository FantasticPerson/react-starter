/**
 * Created by dandan.wu on 16/9/22.
 */
import gulp from 'gulp'
import sequence from 'run-sequence'

export default (context) => {
    return {
        fn: (cb) => {
            sequence(
                'init-storage',
                'prepare-web-assets',
                'compile-web',
                cb
            );
        }
    }
}

//if want to only want to build
// BUILD_PLATFORM=darwin SKIP_CLEAN_DIST= SKIP_PREPARE= SKIP_COMPILE=  DEBUG=true gulp build
