/* eslint-disable import/no-extraneous-dependencies */
const { writeFileSync, readFileSync } = require('fs');
const path = require('path');
const program = require('commander');
const { prompt } = require('inquirer');
const includes = require('lodash/includes');
const split = require('lodash/split');

program.option('-r, --reset', 'Reset CodePush Bundle Id').option('-u, --update', 'Increase CodePush Bundle Id');

program.parse(process.argv);

const update = (program) => {
  const readFile = (inputPath) => readFileSync(inputPath, 'utf8');
  const file = readFile('./package.json');

  const packageJSON = JSON.parse(file);
  const { version, codeBundleId } = packageJSON;
  const [, codepushVersion] = split(codeBundleId, '-');

  const newPackage = {
    ...packageJSON,
  };

  if (program.reset) {
    newPackage.codeBundleId = `${version}-0`;
  }

  if (program.update) {
    newPackage.codeBundleId = `${version}-${Number(codepushVersion) + 1}`;
  }

  const newPackageFile = JSON.stringify(newPackage, null, 2);

  if (JSON.stringify(file, null, 2) === newPackageFile) {
    console.log('변경사항이 없습니다');
    return;
  }

  writeFileSync(path.join(__dirname, '..', 'package.json'), newPackageFile);
};

const OPTION = {
  RESET: 'reset',
  UPDATE: 'update',
};
const NO_COMMAND_SPECIFIED = !process.argv.slice(2).length;
if (NO_COMMAND_SPECIFIED) {
  prompt([
    {
      type: 'type',
      name: 'option',
      message: '코드푸시 버전 [reset, update] 입력하지 않는 경우 지금 버전 유지',
      choices: [OPTION.RESET, OPTION.UPDATE],
    },
  ])
    .then((answers) => {
      if (includes([OPTION.RESET, OPTION.UPDATE], answers.option)) {
        update({ [answers.option]: true });
      }
      return answers;
    })
    .catch((err) => {
      console.log('COMMANDS ERROR', err);
    });
} else {
  update(program);
}
