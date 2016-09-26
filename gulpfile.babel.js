'use strict';

// import './src/macros-init'
global.__COMPILE__ = true;
// global.__JENKINS__ = !!process.env.__JENKINS__;

//console.log(__JENKINS__);


require('babel-core/register');
require('babel-polyfill');

process.on('uncaughtException', globalErrHandler);
process.on('unhandledRejection', globalErrHandler);

function globalErrHandler(err) {
  let errorStackTrace = err instanceof Error ? err.stack || err.stacktrace || "" : err.toString();
  console.error('App crash', `Err:\n ${errorStackTrace}`);
}

import fs from 'fs'
import path from 'path'
import gulp from 'gulp'
import * as DEV_CONST from './dev/const'
//console.dir(DEV_CONST);

let taskConfigs = [];
export const context = {
  taskConfigs: taskConfigs,

  buildAppGreenDirPaths: [],
  buildAppInstallPaths: [],
  outZipFilePath: null,
  targetZipFilePath:null,
  storage: null,
  dependsMd5Changed: false,
  buildTimes: 0
};

//task flow.
let gulpTaskFiles = fs.readdirSync(DEV_CONST.DEV_GULP_TASKS_DIR);
gulpTaskFiles.forEach(function(fileName) {
  //valid gulp-tasks task file name
  let validReg = /^\w\S*.js/;
  if(!validReg.test(fileName)) return;
  //console.log(`----- ${fileName}`);
  let gulpTaskFilePath = `${DEV_CONST.DEV_GULP_TASKS_DIR}/${fileName}`;
  //console.log(`----- ${gulpTaskFilePath}`);

  let gulpTaskConfig = require(gulpTaskFilePath)(context);
  let taskFileName = path.basename(fileName,'.js');

  if(!gulpTaskConfig.name) {
    gulpTaskConfig.name = taskFileName;
  }

  if(!gulpTaskConfig.deps) {
    gulpTaskConfig.deps = [];
  }

  if(gulpTaskConfig.deps.length == 0 && !gulpTaskConfig.fn) return;

  taskConfigs.push(gulpTaskConfig);
  //console.dir(context);return;
  //console.log('init task', gulpTaskConfig.name);
  gulp.task.apply(gulp, [gulpTaskConfig.name, gulpTaskConfig.deps, gulpTaskConfig.fn]);
});
