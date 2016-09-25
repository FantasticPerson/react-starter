export default (context) => {
  return {
    deps: [
      //'prepare-libs-addon',
      'prepare-web-assets',
      'prepare-native-assets',
      'prepare-node-modules'
    ]
  }
}
