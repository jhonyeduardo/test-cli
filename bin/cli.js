#!/usr/bin/env node
require('shelljs/global');

const program = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const childProcess = require('child_process');
const fs = require('fs');
const isDirectory = require('is-directory');
const isUrl = require('is-url');
const absolute = require('absolute');
const pify = require('pify');
const path = require('path');
const del = require('del');
const build = require('./build');
const rewrite = require('./rewrite');
const fileWriter = require('../src/file-writer');

// const build = require('./build');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .action(name => {
    projectName = name;
  })

program.on('--help', function() {
  help();
  helpCalled = true;
});

program
  .command('new <projectName>')
  .alias('n')
  .description('create a new template project')
  .option("-t, --template <template>", "Which template to create")
  .action((projectName, options) => {
    install(projectName, options);
  });

program
  .command('add <folderName>')
  .alias('a')
  .description('add folder to project')
  // .option("-c, --component <component>", "Which template to create")
  // .option("-p, --path <path>", "Which template to create")
  .action((folderName, options) => {
    add(folderName, options);
  })

async function add(folderName, options) {
  // let { component, caminho } = options;

  const dashedFolderName = prepareFolderName(folderName);

  let destination = getDestination(dashedFolderName);

  if (!folderName) {
    console.log('Informe um nome');
  }

  if (!component) {
    var { component, service } = await inquirer.prompt([componentsListPrompt, servicePrompt]);

  }

  try {

    await build.installPackage('@totvs/thf-templates');

    fileWriter.generateModuleFile(destination, dashedFolderName, getComponentName(dashedFolderName), component);
    fileWriter.generateComponentFile(destination, dashedFolderName, getComponentName(dashedFolderName), service);
    fileWriter.generateDocumentationRoutingModule(destination, dashedFolderName, getComponentName(dashedFolderName), component);
    fileWriter.generateTemplateFile(destination, dashedFolderName, getComponentName(dashedFolderName), component);

  } catch (e) {
    console.log('errou:: ', e);
  }
}

function prepareFolderName(folderName) {
  return folderName.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/).map(v => v.toLowerCase()).join('-');
}

function getComponentName(folderName) {
  return folderName.split('-').map(v => v.charAt(0).toUpperCase() + v.substr(1)).join('');

}

function getDestination(folderName) {
  const currentFolder = process.cwd();

  return `${currentFolder}/src/app/${folderName}`;
}

function getPath(projectName, checkExistence = false) {
  const templatePath = path.join(process.cwd(), projectName);

  return checkExistence ? isDirectory.sync(templatePath) && templatePath : templatePath;
}

const componentsListPrompt = {
  type: 'list',
  name: 'component',
  message: `Choose a dynamic component to create:`,
  choices: [
    'ThfPageDynamicTable',
    'ThfPageDynamicDetail',
    'ThfPageDynamicEdit',
  ]
};

const servicePrompt = {
  name: 'service',
  message: `Enter the service to be used by the component:`
};

const overwritePrompt = (projectName) => ({
  type: 'confirm',
  name: 'overwrite',
  message: `There is already a project called "${projectName}", do you want to overwrite it?`
});

const templates = ['sidemenu', 'blank', 'sample'];

const isInvalidTemplate = (template) => {
  const lowerTemplate = template.toLowerCase();

  return !templates.includes(lowerTemplate);
};

async function install(projectName, options) {
  let { template, server } = options;

  if (template && isInvalidTemplate(template)) {
    console.log(`The template "${template}" ins't valid.`);
    
    return;
  }

  template = template || 'sidemenu';

  const endpoint = getEndpoint(template);

  if (endpoint) {

    const destination = getPath(projectName);

    if (fs.existsSync(destination)) {
      const { overwrite } = await inquirer.prompt([overwritePrompt(projectName)]);

      if (!overwrite) return;

      await del(destination, { force: true });
    }

    try {


      console.log(chalk.white.bold('Initializing download...'));

      await pify(childProcess.exec)(`git clone ${endpoint} ${destination}`);

      console.log(`Template "${template}" successfully downloaded!`);

      cd(projectName);

      await pify(childProcess.exec)(`git remote rm origin`);

      await rewrite.packageJson(`${destination}/package.json`, projectName);

      await build.installPackages();

    } catch (e) {

      console.error(`Ops! Happens error in installation of project "${template}"`);
      console.error(e.message);
    }

  } else {
    console.log (`"${template}" is not a template`);
  }
}

function getTemplateUrl(template) {
  const templates = require('../templates.json');

  return templates[template];
}

function getEndpoint(template) {
  let repository = getTemplateUrl(template);
 
  if (isUrl(repository)) {

    /* GIT ENDPOINT */
    if (repository.match(/\.git$/)) return repository;

    /* GITHUB REPOSITORY */
    const repo = repository.match(/.+github\.com\/([^\s\/.]+)\/([^\s\/#]+)(?:$|\/|#)/);

    if (repo) return `https://github.com/${repo[1]}/${repo[2]}.git`;

  }
}

program.parse(process.argv);