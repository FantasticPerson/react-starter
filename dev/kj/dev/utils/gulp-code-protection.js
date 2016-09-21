var through = require("through2");
var BufferXOR = require('../../src/native/utils/buffer-xor');
var gulpUtil       = require('gulp-util');
let path = require('path');

module.exports = function() {
  function getBufferFromObj(obj, fileRef) {
    if(Buffer.isBuffer(obj)) {
      return obj;
    } else if (typeof obj === 'string') {
      return new Buffer(obj);
    } else if(typeof obj === 'function') {
      return getBufferFromObj(obj(fileRef), fileRef);
    }
    return null;
  }

  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(new PluginError('gulp-wrapper', 'Streaming not supported'));
    }

    //for(var s in file) {
    //  console.log(s);
    //}

    //console.log(file.inspect());
    //file.contents = newBuffer;

    var fileStr = file.inspect();
    var fileNameStartIndex = fileStr.indexOf('"');
    var fileNameLastIndex = fileStr.lastIndexOf('"');
    //shit for get the file name, of no api of file.
    var filenname = fileStr.substring(fileNameStartIndex + 1, fileNameLastIndex);
    filenname = path.basename(filenname, '.js')
    //console.log(filenname);

    var fileBuffer = file.contents;
    //console.log(fileBuffer.swap32)
    //fileBuffer.swap32();
    //console.log(filenameBuffer.length);
    BufferXOR(fileBuffer, filenname);
    file.contents = fileBuffer;
    //file.contents = fileBuffer;
    return callback(null, file);
  });
};
