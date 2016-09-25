import sequence from 'run-sequence'
import fs from 'fs';
import * as DEV_CONST from '../const'


export default (context) => {
  return {
    fn: (cb) => {

      //1. 检查depends 是否改变 或 没有 node_modules.asar
      //2. 计算depends生成 node_modules 文件夹, 并生成 node_modules.asar,  删除 源文件
      //3 拷贝至 dist

      let cacheFileExist = fs.existsSync(DEV_CONST.NODE_MODULES_CACHE_FILE);

      console.log('.node_modules.asar is exist', cacheFileExist);
      console.log('dependsMd5Changed is ', context.dependsMd5Changed);

      let needUpdateCache = context.dependsMd5Changed || !cacheFileExist;

      sequence(
        needUpdateCache ? 'prepare-node-modules-npm-clean-node-modules' : 'empty',
        needUpdateCache ? 'prepare-node-modules-generate-node-modules' : 'empty',
        needUpdateCache ? 'prepare-node-modules-generate-node-modules-cache' : 'empty',
        'prepare-node-modules-copy-node-modules-from-cache',
        cb
      );
    }
  };
}



