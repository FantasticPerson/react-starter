import shell from 'gulp-shell'

export default (context) => {
  return {
    deps: [],
    fn: shell.task(`bash ./scripts/sync-addon.sh`, {
      verbose: true
    })
  }
}
