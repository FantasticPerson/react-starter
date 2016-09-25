import sequence from 'run-sequence'

export default (context) => {
  return {
    fn: (cb) => {
      console.log('--------------------------------------');
      console.log('for jenkins tasks');

      if(!__JENKINS__) {
        console.log('not in jenkins env return.');
        cb();
        return;
      }

      sequence(
        'jenkins-copy-to-download-server',
        'jenkins-update-version-config',
        cb
      );
    }
  }
}
