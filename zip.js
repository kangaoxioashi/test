const program = require('commander');
const AdmZip = require('adm-zip');
const fse = require('fs-extra');

program.option('-b, --branch <string>', 'Build branch')
  .option('-m, --message <string>', 'Commit Message');
program.parse(process.argv);
const options = program.opts();
console.log('11111x222s', options);

//1. 把代码打包 zip
console.log(process.cwd())
const zip = new AdmZip('');
zip.addLocalFolder(`${process.cwd()}/src/`);
zip.writeZip('./code.zip');
//2. 拷贝到发布目录
fse.copySync('./code.zip', '../code.zip');
//3. unzip
var unzip = new AdmZip('../code.zip');
unzip.extractAllTo("./code/", true);



