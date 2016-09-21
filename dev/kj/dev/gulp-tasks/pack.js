import sequence from 'run-sequence'

export default (context) => {
  return {
    fn: (cb) => {

      let buildOS = __APP_JSON__.builder.os;
      for(var osName in buildOS) {
        if(osName[0] === '_') {
          delete buildOS[osName];
        }
      }

      sequence(
        'pack-mkdir',
        'pack-electron-app-green',
        //process.env.GREEN_ONLY ? 'empty' : 'pack-electron-app-installer',
        //__DEV__ ? 'empty' : 'pack-zip-all-app-files',
        'pack-zip-all-app-files',
        cb
      );
    }
  }
}
