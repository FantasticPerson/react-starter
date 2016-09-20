import gulp from 'gulp'
import del from 'del';
import * as DEV_CONST from '../const'
import storage from 'node-persist'
import md5 from 'md5'

export default (context) => {
  return {
    fn: (cb) => {
      storage.initSync({
        dir: DEV_CONST.STORAGE_DIR,
        stringify: JSON.stringify,
        parse: JSON.parse,
        encoding: 'utf8',
        logging: false,  // can also be custom logging function
        continuous: true,
        interval: false,
        ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS
      });

      context.storage = storage;
      console.log('init storage');

      //-----------------------------

      //buildTimes
      let buildTimes = parseInt(storage.getItem('buildTimes'));
      if(!buildTimes) buildTimes = 0;
      buildTimes++;

      context.buildTimes = buildTimes;

      storage.setItem("buildTimes", buildTimes);

      console.log('buildTimes ' + buildTimes);

      //------------------------------
      let lastDependsMd5 = storage.getItem('dependsMd5');
      console.log(`last dependsMd5 ${lastDependsMd5}`);

      let appDepends = {
        "dependencies": __APP_JSON__['dependencies'],
        "devDependencies": __APP_JSON__['devDependencies'],
        "dependencies-native": __APP_JSON__['dependencies-native']
      };

      let nowDependsMd5 = md5(JSON.stringify(appDepends));
      console.log(`now dependsMd5 ${nowDependsMd5}`);

      if(lastDependsMd5 !== nowDependsMd5) {
        console.log("dependsMd5 has changed!");
        context.dependsMd5Changed = true;
        storage.setItem('dependsMd5', nowDependsMd5);
      } else {
        context.dependsMd5Changed = false;
      }

      cb();
    }
  };
}
