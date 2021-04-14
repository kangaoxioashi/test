const program = require('commander');
program.option('-b, --branch <string>', 'Build branch')
  .option('-m, --message <string>', 'Commit Message');
program.parse(process.argv);
const options = program.opts();
console.log('11111xs', options);



