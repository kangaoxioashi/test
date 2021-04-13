const program = require('commander');
program.option('-b', 'Build branch', val => val.split(','))
  .option('-m --message <pages>', 'Commit Message');
program.parse(process.argv);