function WebpackErrorPlaugin() {
  // Setup the plugin instance with options...
}

WebpackErrorPlaugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function(stats) {
    //console.log('alex ===================');
    //console.dir(stats.compilation);
    if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1)
    {
      console.log(stats.compilation.errors);
      process.exit(1); // or throw new Error('webpack build failed.');
    }
  });
};

module.exports = WebpackErrorPlaugin;
