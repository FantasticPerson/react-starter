import sequence from 'run-sequence'

export default (context) => {
  return {
    fn: (cb) => {
      sequence(
        'compile-packageJson',
        'compile-native',
        'compile-web',
        //'compile-updater-script',
        __DEBUG__ ? 'empty' : 'compile-src-asar',
        cb
      );
    }
  }
}
