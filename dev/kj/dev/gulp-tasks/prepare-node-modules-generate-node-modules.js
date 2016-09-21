import shell from 'gulp-shell'
import * as DEV_CONST from '../const'

export default (context) => {
  return {
    fn: (cb) => {
      generateNodeModulesDir()
      .then(()=>{
        cb();
      }, err=>{
        cb(err);
      })
    }
  };
}

function mkdir() {
  return new Promise((resolve, reject) => {
    let shellTasks = [
      `mkdir -p ${DEV_CONST.OUTPUT_NODE_MODULES_DIR}`
    ];

    shell.task(shellTasks, {verbose: true})((err)=> {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
}

function listNodeModulesWithJson() {
  return new Promise((resolve, reject) => {
    let exec = require('child_process').exec;

    exec('npm ls --prod --parseable --json',{maxBuffer: 1024 * 1024}, (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(stdout).dependencies);
      }
    })
  })
}

function listNpmNodeModules() {
  return new Promise((resolve, reject) => {
    let exec = require('child_process').exec;
    exec('npm ls --prod --parseable',{maxBuffer: 1024 * 1024}, (err, stdout) => {
      if (err) {
        //console.log('err');
        reject(err);
      } else {
        let dependencies = stdout.split('\n').map(item => {
          //获取模块名
          let startIdx = DEV_CONST.NODE_MODULES_DIR.length + 1;
          let itemName = item.substring(startIdx).split('\/')[0];
          //console.log('--------------------------', itemName);
          return itemName;
        });

        let dependenciesHash = {};

        dependencies.forEach((name)=>{
          dependenciesHash[name] = true;
        });

        resolve(dependenciesHash);
      }
    })
  });
}

function cpNodeModules(dependencies) {
  return new Promise((resolve, reject) => {
    let shellTasks = [];
    dependencies.forEach(dependence => {
      shellTasks.push(`cp -Rf ${DEV_CONST.NODE_MODULES_DIR}/${dependence} ${DEV_CONST.OUTPUT_NODE_MODULES_DIR}/${dependence}`);
    });

    shell.task(shellTasks, {verbose: false})((err)=> {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
}

function filterNodeModules(dependenciesJson, dependenciesHash) {
  let nativedependencies =  __APP_JSON__['dependencies-native'];

  //console.dir(dependenciesJson);

  let result = [];
  nativedependencies.forEach((nativedependence)=> {
    result.push(nativedependence);
    findDependence(dependenciesJson[nativedependence], result);
  });

  //console.dir(result);
  //console.log('-------------');
  //console.dir(dependenciesHash);


  //filter the dump

  //special,  white name list
  //some error lost.
  let resultHash = {
    'lodash.isarguments': true,
    'lodash.isarray': true
  };

  result.forEach((subModuleName)=>{
    if(dependenciesHash[subModuleName]) {
      resultHash[subModuleName] = true;
    }
  });

  return Object.keys(resultHash);
}

function findDependence(moduleJson, results) {
  if(!moduleJson) return results;

  results = results || [];
  //console.log('==================');
  let dependencies = moduleJson.dependencies;
  for(var moduleName in dependencies) {
    //console.log(moduleName);
    results.push(moduleName);
    findDependence(dependencies[moduleName], results);
  }

  return results;
}

function generateNodeModulesDir() {
  return mkdir()
    .then(() => {
      console.log('listNodeModulesWithJson');
      return listNodeModulesWithJson();
    })
    .then((modulesJson)=>{
      console.log('listNpmNodeModules');
      return listNpmNodeModules()
        .then((modulesHash)=>{
          console.log('-=-');
          return [modulesJson, modulesHash];
        })
    })
    .then((val)=> {
      console.log('filterNodeModules');
      return filterNodeModules(val[0], val[1]);
    })
    .then((dependencies) => {
      console.log('all node modules');
      console.log('...........................................................');
      console.log(dependencies);
      console.log('...........................................................');
      return cpNodeModules(dependencies);
    })
}


