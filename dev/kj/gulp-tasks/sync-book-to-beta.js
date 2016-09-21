import shell from 'gulp-shell'
import path from 'path'
import * as DEV_CONST from '../const'

export default (context) => {
  return {
    deps: [],
    fn: (cb) => {
      shell.task([`scp -r ${DEV_CONST.OUTPUT_DIR}/public/subapp/rhino/courses saybot@192.168.0.105://Users/saybot/jenkins_slave/workspace/kejian-usb-2.0-beta/assets/.public/subapp/rhino/courses`,`scp -r ${DEV_CONST.OUTPUT_DIR}/public/subapp/rhino/units saybot@192.168.0.105://Users/saybot/jenkins_slave/workspace/kejian-usb-2.0-beta/assets/.public/subapp/rhino/units`], {
        verbose: true
      })((err)=> {
        cb(err);
      })
    }
  }
}
