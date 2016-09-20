export default (context) => {
  return {
    desc: 'help for all cmd~',
    fn: () => {
      let taskConfigs = context.taskConfigs;
      console.log('all gulp tasks:');
      console.log('---------------------------');
      taskConfigs.forEach((taskConfig) => {

        let depsMsg = taskConfig.deps && taskConfig.deps.length ? `deps:[${taskConfig.deps.toString()}]` : '';
        let descMsg = taskConfig.desc && taskConfig.desc.length ? `desc:(${taskConfig.desc})` : '';

        console.log(`<${taskConfig.name}> ${depsMsg} ${descMsg}`);
      });
      console.log('---------------------------');
    }
  };
}
