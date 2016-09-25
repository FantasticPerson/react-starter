import sequence from 'run-sequence'

import * as DEV_CONST from '../const'
import gulp from 'gulp';
import babel from 'gulp-babel';
import gulpEmpty from "gulp-empty";
import gulpUglify from 'gulp-uglify';

export default (context) => {
  return {
    desc: 'native es6 code to cmd',
    fn: (cb) => {
      sequence(
        'compile-native-macros',
        'compile-native-main',
        //'compile-native-main-uglify',
        'compile-native-jse',
        __DEBUG__ ? 'empty' : 'compile-native-clear',
        cb);
    }
  };
}



