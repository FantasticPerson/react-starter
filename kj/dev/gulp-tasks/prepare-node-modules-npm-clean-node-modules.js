import shell from 'gulp-shell'

export default (context) => {
  return {
    fn: (cb) => {
      cb();
      //shell.task(`npm prune && npm ddp && npm install` , {
      //  verbose: false
      //})((err)=> {
      //  if (err) {
      //    cb(err);
      //  } else {
      //    cb();
      //  }
      //})
    }
  };
}
