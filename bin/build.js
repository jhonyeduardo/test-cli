#!/usr/bin/env node

require('shelljs/global');
const chalk = require('chalk');
const spawn = require('cross-spawn');

// const commands = require('./rewritefiles');

const installPackages = () => {
  console.log(chalk.white.bold('Installing packages...'));

  return new Promise((resolve, reject) => {
    let command = 'npm';
    let args = ['install'];

    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`
        });
        return;
      }

      console.log('Packages installed sucessfully!')
      resolve();
    })
  })
}

const installPackage = (package) => {
  console.log(chalk.white.bold('Installing package...'));

  return new Promise((resolve, reject) => {
    let command = 'npm';
    let args = ['install', '--save', `${package}`];

    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`
        });
        return;
      }

      console.log(chalk.white.bold('Package installed sucessfully!'));
      resolve();
    })
  })
}

// const build = (appName, author, command, repo = false) => {
//   cp('-r', __dirname + '/../src/.', appName);
//   if (repo) {
//     Git.Clone(repo, `${appName}/src`)
//       .then(repository => {
//         doReWrites(appName, author, command)
//       })
//   } else {
//     mkdir(`${appName}/src`)
//     doReWrites(appName, author, command)
//   }
// }

// function doReWrites(appName, author, command) {
//   commands.rewritePackageJson(`${appName}/package.json`, author, command)
//     .then(() => {

//     })
// }

module.exports = { installPackages, installPackage }