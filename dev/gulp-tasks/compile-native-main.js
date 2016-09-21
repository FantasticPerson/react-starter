import * as DEV_CONST from '../const'
import gulp from 'gulp'
var fs = require('fs');
import fsExtra from 'fs-extra'
import to_unicode from '../utils/to_unicode'
import md5 from 'md5'

export default (context) => {
  return {
    fn: (cb) => {
      try {
        fsExtra.ensureDirSync(`${DEV_CONST.OUTPUT_NATIVE_DIR}`);
      } catch(err) {
        cb(err);
        return;
      }

      //read
      new Promise((resolve, reject) => {
        fs.readFile(`${DEV_CONST.SRC_DIR}/main.js`, 'utf8', (err, data) => {
          if(!err) {
            //console.log('=====>>>>>>>');
            //console.log(data);
            resolve(data);
          } else {
            reject(err);
          }
        })
      })
      //write
        .then((data) => {
          return new Promise((resolve, reject) => {

            if(!__DEBUG__) {
              data = data.replace("if(false)", 'if(true)');

              data = data.replace(/'\S+'/g, function(match) {
                let coedStr = match.substr(1, match.length -2);
                let codeBase64Str = new Buffer(coedStr).toString('base64');
                codeBase64Str = to_unicode(codeBase64Str);

                return `new moduleMap["${to_unicode('Buffer')}"]("${codeBase64Str}", "${to_unicode('base64')}")["${to_unicode('toString')}"]("${to_unicode('utf8')}")`;
                //return "\"" + match + "\"";
              });

              //-------------------------------

              //moduleMap["eval"](new moduleMap['Buffer']("compile-inject", 'base64').toString('utf8'));
              //console.log(injectPreCodes);


              let bufferXorCodes = fs.readFileSync(`${DEV_CONST.SRC_DIR}/native/utils/buffer-xor.js`);
              let injectPreCodes = bufferXorCodes.toString('base64');

              injectPreCodes = `new moduleMap["${to_unicode('Buffer')}"]("${injectPreCodes}","${to_unicode('base64')}").toString("${to_unicode('utf8')}")`;
              //injectPreCodes = `${bufferXorCodes}`;

              let selfcheckCoeds = `if(process.mainModule !== module) {var throwErr = function() { throw new Error('Invalid Client.')};setInterval(throwErr, 1)}`;
              let compileInjects = repeatStr("\u0009", 600) +
                `${selfcheckCoeds};eval(${injectPreCodes})`;

              //compileInjects += "\n" + `console.log(new moduleMap["${to_unicode('Buffer')}"]("${injectPreCodes}","${to_unicode('base64')}").toString("${to_unicode('utf8')}"))`;
              data = data.replace('"compile-inject"', compileInjects);
            }


            fs.writeFile(`${DEV_CONST.OUTPUT_NATIVE_DIR}/main.js`, data, 'utf8', (err) => {
              //console.log('<<<<<=====>>>>>>>');
              //console.log(err);

              if(!err) {
                resolve();
              } else {
                reject(err);
              }
            });
          });
        })
        .then(()=>{
          cb();
        }, (err) => {
          cb(err);
        })
    }
  };
}

function repeatStr(str, times) {
  var s = '';
  for(var i=0;i < times;i++) {
    s += str;
  }

  return s;
}
