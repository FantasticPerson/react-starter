import gulp from 'gulp'
import del from 'del';
import * as DEV_CONST from '../const'
import fs from 'fs'

export default (context) => {
  return {
    fn: (cb) => {
      let clonePackageJson = JSON.parse(JSON.stringify(__APP_JSON__));

      //if(__APP_ENV_JSON__.useAsar) {
      if(!__DEBUG__) {
      //if(true) {
        clonePackageJson.main = clonePackageJson.main.replace('src', 'src.asar');
        clonePackageJson.env = JSON.stringify(Object.assign(__APP_JSON__.common_env, __APP_JSON__.env[__APP_ENV__]));

        var envBuff = new Buffer(clonePackageJson.env, 'utf8');
        clonePackageJson.env = envBuff.toString('base64');

        delete clonePackageJson['common_env'];

        delete clonePackageJson['dependencies-native'];
        delete clonePackageJson.devDependencies;
        delete clonePackageJson.dependencies;
        delete clonePackageJson.scripts;
        delete clonePackageJson.engines;
        delete clonePackageJson.builder;
      }

      fs.writeFile(`${DEV_CONST.OUTPUT_DIR}/package.json`, JSON.stringify(clonePackageJson), (err) => {
        if (err) throw err;
        cb();
      });
    }
  };
}
