//import AdmZip from 'adm-zip'
import path from 'path'
import dateFormat from 'dateformat'
import gulp from 'gulp'
import * as DEV_CONST from '../const'
const BufferXOR = require('../../src/native/utils/buffer-xor');

//the name prefix zzz just for file sort at the bottom.
export default (context) => {
  return {
    desc: 'Just for gulp dev test',
    fn: fot_test_buffer_xor
  }
}

function fot_test_buffer_xor() {
  //console.log(BufferXOR(new Buffer('helloasdasdsad.asdsad'), new Buffer('3344', 'hex')).toString('utf8'));
}


function for_test() {
  return Promise.resolve()
    .then(()=> {
      console.log('asd');
    })
}

function for_zip(cb) {
  var buildDir = path.join(__dirname, '../../build');

  console.log(buildDir);
  var appPath = path.join(buildDir, 'test');

  var fileZip = new AdmZip();
  fileZip.addLocalFolder(appPath);
  fileZip.writeZip(`${buildDir}/aa.zip`);
}

function for_timeformat(cb) {

  console.log(dateFormat(new Date(), "yyyy-mm-dd_HH:MM:ss"));

  //console.log(dateFormat(new Date(), 'isoDateTime'));
  cb();
}

function for_gen() {
  function * gen() {
    yield 3;
  }

  var g = gen();
  console.log(g);
}


let gulpSrc = [
  //dir
  //'!*examples*',
  //'!*test*',
  //'!node-pre-gyp',

  //file
  '!*.(sh|cmd|eslintrc|jshintrc|yml|markdown|md|npmignore|editorconfig|h|cc|1|Makefile|py|gyp|gz|patch)',

  //'!*LICENSE',
  //'!*license',
  //'!*AUTHORS',
  //'!*bower.json',
  //'!*test.js',
];

function for_nodeModules(cb) {
  gulp.src([...gulpSrc, `${DEV_CONST.NODE_MODULES_DIR}/**/*`])
   .pipe(gulp.dest(DEV_CONST.OUTPUT_NODE_MODULES_DIR));
}
